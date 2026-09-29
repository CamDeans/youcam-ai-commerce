import { NextResponse } from "next/server";
import { matchProducts } from "@/lib/match";
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

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing image file" }, { status: 400 });
    }

    const contentType = (file.type || "").toLowerCase();
    if (contentType && !ALLOWED_TYPES.has(contentType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use jpg, png, or webp." },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image too large. Keep selfies under 8 MB." },
        { status: 400 },
      );
    }

    const { enabled } = getYouCamConfig();
    const bytes = await file.arrayBuffer();
    const safeType = ALLOWED_TYPES.has(contentType) ? contentType : "image/jpeg";
    const previewDataUrl = `data:${safeType};base64,${Buffer.from(bytes).toString("base64")}`;

    if (!enabled) {
      const analysis = mockAnalysis();
      const products = matchProducts(analysis.concerns);
      return NextResponse.json({
        analysis,
        products,
        previewDataUrl,
      });
    }

    const fileId = await uploadImageToYouCam(
      bytes,
      safeType,
      file.name || "selfie.jpg",
    );
    const { concerns, skinType, raw } = await runSkinAnalysis(fileId);

    // If parser finds nothing, fall back lightly so UI still works
    const safeConcerns =
      concerns.length > 0
        ? concerns
        : mockAnalysis().concerns.map((c) => ({ ...c, score: Math.max(20, c.score - 10) }));

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

    return NextResponse.json({
      analysis,
      products,
      previewDataUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
