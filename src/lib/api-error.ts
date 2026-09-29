/**
 * Public API error shaping — never leak secrets or signed URLs to clients.
 */

const SECRET_PATTERNS = [
  /Bearer\s+[A-Za-z0-9._\-]+/gi,
  /YOUCAM_API_KEY[=:]\s*\S+/gi,
  /sk-[A-Za-z0-9_-]{8,}/g,
  /api[_-]?key[=:]\s*\S+/gi,
  /Authorization[=:]\s*\S+/gi,
];

export function redactSecrets(text: string): string {
  let out = text;
  for (const re of SECRET_PATTERNS) {
    out = out.replace(re, "[REDACTED]");
  }
  out = out.replace(/https?:\/\/[^\s"']+/gi, (url) => {
    try {
      const u = new URL(url);
      return `${u.origin}${u.pathname}`;
    } catch {
      return "[url]";
    }
  });
  return out;
}

export function publicErrorMessage(err: unknown, fallback = "Request failed"): {
  error: string;
  code: string;
  retryable?: boolean;
  status: number;
} {
  if (err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "ENV_CONFIG") {
    const message =
      err instanceof Error
        ? redactSecrets(err.message)
        : "Invalid environment configuration";
    return { error: message, code: "ENV_CONFIG", status: 503 };
  }
  if (err instanceof Error) {
    const raw = redactSecrets(err.message || fallback);
    const isAbort =
      err.name === "AbortError" || /timed out|aborted|timeout/i.test(err.message);
    if (isAbort) {
      return {
        error: "Upstream request timed out. Please try again.",
        code: "TIMEOUT",
        status: 504,
        retryable: true,
      };
    }
    // Keep user-facing validation-ish messages; sanitize anything else lightly.
    if (/YOUCAM_API_KEY is not set/i.test(raw)) {
      return {
        error:
          "YouCam is not configured. Demo mode works without a key; live mode needs YOUCAM_API_KEY.",
        code: "NOT_CONFIGURED",
        status: 503,
      };
    }
    return {
      error: raw || fallback,
      code: "UPSTREAM",
      status: 502,
      retryable: /temporarily|try again|5\d\d/i.test(raw),
    };
  }
  return { error: fallback, code: "INTERNAL", status: 502 };
}
