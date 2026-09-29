import { NextResponse } from "next/server";
import { publicErrorMessage } from "@/lib/api-error";
import { matchProducts } from "@/lib/match";
import { createRequestId, log } from "@/lib/logger";
import { clientKeyFromRequest, rateLimit } from "@/lib/rate-limit";
import {
  getYouCamConfig,
  runSkinAnalysis,
  uploadImageToYouCam,
} from "@/lib/youcam/client";
import { mockAnalysis } from "@/lib/youcam/mock";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const MAX_BYTES = 8 * 1024 * 1024;

function json(
  body: unknown,
  init?: { status?: number; requestId?: string },
) {
  const res = NextResponse.json(body, { status: init?.status ?? 200 });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  if (init?.requestId) res.headers.set("x-request-id", init.requestId);
  return res;
}

export async function POST(request: Request) {
  const requestId = createRequestId();
  try {
    const rl = rateLimit(`analyze:${clientKeyFromRequest(request)}`, {
      limit: 20,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      log("warn", "analyze_rate_limited", {
        requestId,
        retryAfterSec: rl.retryAfterSec,
      });
      return json(
        {
          error: "Too many analysis requests. Please wait a moment.",
          code: "RATE_LIMIT",
          retryable: true,
        },
        { status: 429, requestId },
      );
    }

    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return json(
        { error: "Missing image file", code: "VALIDATION" },
        { status: 400, requestId },
      );
    }

    const contentType = (file.type || "").toLowerCase();
    if (contentType && !ALLOWED_TYPES.has(contentType)) {
      return json(
        {
          error: "Unsupported file type. Use jpg, png, or webp.",
          code: "VALIDATION",
        },
        { status: 400, requestId },
      );
    }
    if (file.size > MAX_BYTES) {
      return json(
        {
          error: "Image too large. Keep selfies under 8 MB.",
          code: "VALIDATION",
        },
        { status: 400, requestId },
      );
    }

    const { enabled } = getYouCamConfig();
    const bytes = await file.arrayBuffer();
    const safeType = ALLOWED_TYPES.has(contentType) ? contentType : "image/jpeg";

    if (!enabled) {
      const analysis = mockAnalysis();
      const products = matchProducts(analysis.concerns);
      log("info", "analyze_mock_ok", {
        requestId,
        productCount: products.length,
        bytes: file.size,
      });
      // Client keeps local preview — do not echo base64 (payload bloat).
      return json({ analysis, products }, { requestId });
    }

    const fileId = await uploadImageToYouCam(
      bytes,
      safeType,
      file.name || "selfie.jpg",
    );
    const { concerns, skinType, raw } = await runSkinAnalysis(fileId);

    const safeConcerns =
      concerns.length > 0
        ? concerns
        : mockAnalysis().concerns.map((c) => ({
            ...c,
            score: Math.max(20, c.score - 10),
          }));

    const summary = skinType
      ? `Live YouCam analysis · skin type signal: ${skinType}. Top concerns ranked for matching.`
      : "Live YouCam analysis complete. Top concerns ranked for product matching.";

    const analysis = {
      mode: "live" as const,
      fileId,
      concerns: safeConcerns,
      skinType,
      summary,
      rawNote: raw ? "live" : undefined,
    };

    const products = matchProducts(analysis.concerns);
    log("info", "analyze_live_ok", {
      requestId,
      productCount: products.length,
      concernCount: safeConcerns.length,
    });

    return json({ analysis, products }, { requestId });
  } catch (err) {
    const pub = publicErrorMessage(err, "Analysis failed");
    log("error", "analyze_failed", {
      requestId,
      error: pub.error,
      code: pub.code,
    });
    return json(
      {
        error: pub.error,
        code: pub.code,
        ...(pub.retryable ? { retryable: true } : {}),
      },
      { status: pub.status, requestId },
    );
  }
}
