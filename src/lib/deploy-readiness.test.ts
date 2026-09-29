import { describe, expect, it } from "vitest";
import { getProduct, matchProducts } from "@/lib/match";
import { mockAnalysis, mockSimulationImage } from "@/lib/youcam/mock";
import { parseAnalysisConcerns } from "@/lib/youcam/client";
import { getAppEnv } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";

describe("matchProducts", () => {
  it("returns up to 4 ranked products for mock concerns", () => {
    const analysis = mockAnalysis();
    const products = matchProducts(analysis.concerns, 4);
    expect(products).toHaveLength(4);
    expect(products[0].matchScore).toBeGreaterThanOrEqual(products[3].matchScore);
    expect(products[0].why).toMatch(/concern/i);
  });

  it("resolves known catalog ids", () => {
    expect(getProduct("niacinamide-clarity")?.name).toMatch(/Niacinamide/);
    expect(getProduct("nope")).toBeUndefined();
  });
});

describe("mockAnalysis / mockSimulationImage", () => {
  it("exposes mock mode and deterministic concerns", () => {
    const a = mockAnalysis();
    expect(a.mode).toBe("mock");
    expect(a.fileId).toBe("mock-file-id");
    expect(a.concerns.length).toBeGreaterThan(3);
  });

  it("builds an svg data url from intensities", () => {
    const url = mockSimulationImage({ pores: 0.5, acne: 0.2 });
    expect(url.startsWith("data:image/svg+xml")).toBe(true);
    expect(url).toContain("pores");
  });
});

describe("parseAnalysisConcerns", () => {
  it("normalizes nested hd_ scores", () => {
    const { concerns, skinType } = parseAnalysisConcerns({
      results: {
        hd_pore: { score: 72 },
        hd_acne: 0.41,
        skin_type: "Oily",
      },
    });
    expect(skinType).toBe("Oily");
    const pore = concerns.find((c) => c.key === "pore");
    const acne = concerns.find((c) => c.key === "acne");
    expect(pore?.score).toBe(72);
    expect(acne?.score).toBe(41);
  });
});

describe("getAppEnv", () => {
  it("defaults base URL and disabled without key", () => {
    const env = getAppEnv({
      YOUCAM_API_KEY: undefined,
      YOUCAM_API_BASE_URL: undefined,
    });
    expect(env.youcamEnabled).toBe(false);
    expect(env.mode).toBe("mock");
    expect(env.youcamBaseUrl).toContain("makeupar.com");
  });

  it("falls back when base URL is invalid in mock", () => {
    const env = getAppEnv({ YOUCAM_API_BASE_URL: "not a url" });
    expect(env.youcamBaseUrl).toBe("https://yce-api-01.makeupar.com");
    expect(env.mode).toBe("mock");
  });

  it("fails clearly when YOUCAM_MODE=live without key", () => {
    expect(() => getAppEnv({ YOUCAM_MODE: "live" })).toThrow(/YOUCAM_MODE=live/);
  });

  it("fails clearly when key set with invalid base URL", () => {
    expect(() =>
      getAppEnv({
        YOUCAM_API_KEY: "test-key",
        YOUCAM_API_BASE_URL: "not a url",
      }),
    ).toThrow(/YOUCAM_API_BASE_URL/);
  });
});

describe("rateLimit", () => {
  it("allows within window then blocks", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, { limit: 2, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimit(key, { limit: 2, windowMs: 60_000 }).ok).toBe(true);
    const blocked = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
  });
});
