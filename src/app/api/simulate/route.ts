import { NextResponse } from "next/server";
import { publicErrorMessage } from "@/lib/api-error";
import { getProduct } from "@/lib/match";
import { createRequestId, log } from "@/lib/logger";
import { clientKeyFromRequest, rateLimit } from "@/lib/rate-limit";
import { getYouCamConfig, runSkinSimulation } from "@/lib/youcam/client";
import { mockSimulationImage } from "@/lib/youcam/mock";

export const runtime = "nodejs";
export const maxDuration = 60;

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
    const rl = rateLimit(`simulate:${clientKeyFromRequest(request)}`, {
      limit: 30,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      log("warn", "simulate_rate_limited", { requestId });
      return json(
        {
          error: "Too many simulation requests. Please wait a moment.",
          code: "RATE_LIMIT",
          retryable: true,
        },
        { status: 429, requestId },
      );
    }

    let body: {
      productId?: string;
      fileId?: string;
      previewDataUrl?: string;
    };
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return json(
        { error: "Invalid JSON body", code: "VALIDATION" },
        { status: 400, requestId },
      );
    }

    if (!body.productId) {
      return json(
        { error: "productId required", code: "VALIDATION" },
        { status: 400, requestId },
      );
    }

    const product = getProduct(body.productId);
    if (!product) {
      return json(
        { error: "Unknown product", code: "NOT_FOUND" },
        { status: 404, requestId },
      );
    }

    const { enabled } = getYouCamConfig();

    if (!enabled || !body.fileId || body.fileId === "mock-file-id") {
      log("info", "simulate_mock_ok", { requestId, productId: product.id });
      return json(
        {
          simulation: {
            mode: "mock",
            productId: product.id,
            beforeDataUrl: body.previewDataUrl,
            afterImageUrl: mockSimulationImage(product.simulation),
            intensities: product.simulation,
          },
        },
        { requestId },
      );
    }

    const { imageUrl } = await runSkinSimulation(
      body.fileId,
      product.simulation,
    );
    log("info", "simulate_live_ok", { requestId, productId: product.id });
    return json(
      {
        simulation: {
          mode: "live",
          productId: product.id,
          beforeDataUrl: body.previewDataUrl,
          afterImageUrl: imageUrl,
          intensities: product.simulation,
        },
      },
      { requestId },
    );
  } catch (err) {
    const pub = publicErrorMessage(err, "Simulation failed");
    log("error", "simulate_failed", {
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
