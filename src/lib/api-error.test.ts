import { describe, expect, it } from "vitest";
import { publicErrorMessage, redactSecrets } from "@/lib/api-error";

describe("api-error redaction", () => {
  it("redacts bearer tokens and query strings", () => {
    const out = redactSecrets(
      "Bearer abc.def.ghi at https://cdn.example.com/x?token=secret#h",
    );
    expect(out).not.toMatch(/abc\.def\.ghi/);
    expect(out).not.toMatch(/token=secret/);
    expect(out).toContain("[REDACTED]");
    expect(out).toContain("https://cdn.example.com/x");
  });

  it("maps timeouts to retryable 504", () => {
    const err = new Error("YouCam request timed out after 25000ms");
    err.name = "AbortError";
    const pub = publicErrorMessage(err);
    expect(pub.status).toBe(504);
    expect(pub.retryable).toBe(true);
    expect(pub.code).toBe("TIMEOUT");
  });

  it("maps missing key to safe NOT_CONFIGURED", () => {
    const pub = publicErrorMessage(new Error("YOUCAM_API_KEY is not set"));
    expect(pub.code).toBe("NOT_CONFIGURED");
    expect(pub.status).toBe(503);
    expect(pub.error).not.toMatch(/is not set$/);
  });
});
