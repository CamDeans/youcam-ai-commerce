const DEFAULT_BASE = "https://yce-api-01.makeupar.com";

export type AppEnv = {
  youcamApiKey: string;
  youcamBaseUrl: string;
  youcamEnabled: boolean;
  mode: "mock" | "live";
  commitSha: string | undefined;
  vercelEnv: string | undefined;
};

export class EnvConfigError extends Error {
  readonly code = "ENV_CONFIG";

  constructor(message: string) {
    super(message);
    this.name = "EnvConfigError";
  }
}

function tryParseHttpUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return raw.replace(/\/$/, "");
  } catch {
    return null;
  }
}

/**
 * Validate env. Mock is graceful when key absent.
 * Throws EnvConfigError when live mode is forced without a key, or when a key
 * is present with an explicitly invalid YOUCAM_API_BASE_URL.
 */
export function getAppEnv(
  source: Record<string, string | undefined> = process.env,
): AppEnv {
  const youcamApiKey = source.YOUCAM_API_KEY?.trim() ?? "";
  const rawBase = source.YOUCAM_API_BASE_URL?.trim() || DEFAULT_BASE;
  const modeHint = (source.YOUCAM_MODE?.trim() || "auto").toLowerCase();
  const parsedBase = tryParseHttpUrl(rawBase);

  if (modeHint === "live" && !youcamApiKey) {
    throw new EnvConfigError(
      "YOUCAM_MODE=live requires YOUCAM_API_KEY. Unset YOUCAM_MODE or set the key (never commit it).",
    );
  }

  if (youcamApiKey && source.YOUCAM_API_BASE_URL?.trim() && !parsedBase) {
    throw new EnvConfigError(
      "YOUCAM_API_BASE_URL must be a valid http(s) URL when YOUCAM_API_KEY is set.",
    );
  }

  const youcamBaseUrl = parsedBase ?? DEFAULT_BASE;

  if (modeHint === "mock") {
    return {
      youcamApiKey: "",
      youcamBaseUrl,
      youcamEnabled: false,
      mode: "mock",
      commitSha: source.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || undefined,
      vercelEnv: source.VERCEL_ENV,
    };
  }

  const enabled = youcamApiKey.length > 0;
  return {
    youcamApiKey: enabled ? youcamApiKey : "",
    youcamBaseUrl,
    youcamEnabled: enabled,
    mode: enabled ? "live" : "mock",
    commitSha: source.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || undefined,
    vercelEnv: source.VERCEL_ENV,
  };
}

/** Soft resolve for health — never throws. */
export function peekAppEnv(
  source: Record<string, string | undefined> = process.env,
): { env: AppEnv | null; configError: string | null } {
  try {
    return { env: getAppEnv(source), configError: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid environment configuration";
    return { env: null, configError: message };
  }
}
