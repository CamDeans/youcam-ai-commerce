import { NextResponse } from "next/server";
import { getProduct } from "@/lib/match";
import { getYouCamConfig, runSkinSimulation } from "@/lib/youcam/client";
import { mockSimulationImage } from "@/lib/youcam/mock";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      fileId?: string;
      previewDataUrl?: string;
    };

    if (!body.productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const product = getProduct(body.productId);
    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    }

    const { enabled } = getYouCamConfig();

    if (!enabled || !body.fileId || body.fileId === "mock-file-id") {
      return NextResponse.json({
        simulation: {
          mode: "mock",
          productId: product.id,
          beforeDataUrl: body.previewDataUrl,
          afterImageUrl: mockSimulationImage(product.simulation),
          intensities: product.simulation,
        },
      });
    }

    const { imageUrl } = await runSkinSimulation(body.fileId, product.simulation);
    return NextResponse.json({
      simulation: {
        mode: "live",
        productId: product.id,
        beforeDataUrl: body.previewDataUrl,
        afterImageUrl: imageUrl,
        intensities: product.simulation,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Simulation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
