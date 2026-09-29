import { NextResponse } from "next/server";
import { peekAppEnv } from "@/lib/env";

export async function GET() {
  const { env, configError } = peekAppEnv();

  if (configError || !env) {
    const res = NextResponse.json(
      {
        ok: false,
        youcamLive: false,
        mode: "misconfigured",
        error: configError ?? "Invalid environment configuration",
        code: "ENV_CONFIG",
        version: process.env.npm_package_version || "0.1.0",
      },
      { status: 503 },
    );
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  const res = NextResponse.json({
    ok: true,
    youcamLive: env.youcamEnabled,
    baseUrl: env.youcamEnabled ? env.youcamBaseUrl : undefined,
    mode: env.mode,
    version: process.env.npm_package_version || "0.1.0",
    commit: env.commitSha,
    vercelEnv: env.vercelEnv,
  });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
