const DEFAULT_BASE = "https://yce-api-01.makeupar.com";

export type AppEnv = {
  youcamApiKey: string;
  youcamBaseUrl: string;
  youcamEnabled: boolean;
  commitSha: string | undefined;
  vercelEnv: string | undefined;
};

/** Validate non-secret env shape. Never throws secrets into logs. */
export function getAppEnv(): AppEnv {
  const youcamApiKey = process.env.YOUCAM_API_KEY?.trim() ?? "";
  const rawBase = process.env.YOUCAM_API_BASE_URL?.trim() || DEFAULT_BASE;
  let youcamBaseUrl = rawBase.replace(/\/$/, "");

  try {
    const u = new URL(youcamBaseUrl);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      youcamBaseUrl = DEFAULT_BASE;
    }
  } catch {
    youcamBaseUrl = DEFAULT_BASE;
  }

  return {
    youcamApiKey,
    youcamBaseUrl,
    youcamEnabled: youcamApiKey.length > 0,
    commitSha:
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      undefined,
    vercelEnv: process.env.VERCEL_ENV,
  };
}
