import { NextResponse } from "next/server";
import { getAppEnv } from "@/lib/env";

export async function GET() {
  const env = getAppEnv();
  const res = NextResponse.json({
    ok: true,
    youcamLive: env.youcamEnabled,
    baseUrl: env.youcamEnabled ? env.youcamBaseUrl : undefined,
    mode: env.youcamEnabled ? "live" : "mock",
    version: process.env.npm_package_version || "0.1.0",
    commit: env.commitSha,
    vercelEnv: env.vercelEnv,
  });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
