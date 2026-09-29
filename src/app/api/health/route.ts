import { NextResponse } from "next/server";
import { getYouCamConfig } from "@/lib/youcam/client";

export async function GET() {
  const { enabled, baseUrl } = getYouCamConfig();
  return NextResponse.json({
    ok: true,
    youcamLive: enabled,
    baseUrl: enabled ? baseUrl : undefined,
    mode: enabled ? "live" : "mock",
  });
}
