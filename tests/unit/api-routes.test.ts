import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GET as healthGet } from "@/app/api/health/route";
import { POST as analyzePost } from "@/app/api/analyze/route";
import { POST as simulatePost } from "@/app/api/simulate/route";

const KEYS = ["YOUCAM_API_KEY", "YOUCAM_API_BASE_URL", "YOUCAM_MODE"] as const;

describe("API routes — mock mode + validation", () => {
  const prev: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of KEYS) {
      prev[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of KEYS) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
  });

  it("GET /api/health reports mock", async () => {
    const res = await healthGet();
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.youcamLive).toBe(false);
    expect(json.mode).toBe("mock");
    expect(res.headers.get("cache-control")).toMatch(/no-store/);
  });

  it("POST /api/analyze rejects missing file", async () => {
    const form = new FormData();
    const res = await analyzePost(
      new Request("http://localhost/api/analyze", { method: "POST", body: form }),
    );
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/Missing image/i);
    expect(json.code).toBe("VALIDATION");
  });

  it("POST /api/analyze rejects unsupported type", async () => {
    const form = new FormData();
    form.append(
      "image",
      new File(["not-an-image"], "bad.txt", { type: "text/plain" }),
    );
    const res = await analyzePost(
      new Request("http://localhost/api/analyze", { method: "POST", body: form }),
    );
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.code).toBe("VALIDATION");
  });

  it("POST /api/analyze rejects oversized image", async () => {
    const big = Buffer.alloc(8 * 1024 * 1024 + 1, 1);
    const form = new FormData();
    form.append("image", new File([big], "huge.jpg", { type: "image/jpeg" }));
    const res = await analyzePost(
      new Request("http://localhost/api/analyze", { method: "POST", body: form }),
    );
    expect(res.status).toBe(400);
  });

  it("POST /api/analyze returns mock analysis without echoing base64", async () => {
    const selfie = readFileSync(join(process.cwd(), "public/demo-selfie.jpg"));
    const form = new FormData();
    form.append(
      "image",
      new File([selfie], "demo-selfie.jpg", { type: "image/jpeg" }),
    );
    const res = await analyzePost(
      new Request("http://localhost/api/analyze", { method: "POST", body: form }),
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.analysis.mode).toBe("mock");
    expect(json.products.length).toBeGreaterThan(0);
    expect(json.previewDataUrl).toBeUndefined();
    expect(JSON.stringify(json)).not.toMatch(/Bearer\s+\S+/);
  });

  it("POST /api/simulate validates productId", async () => {
    const res = await simulatePost(
      new Request("http://localhost/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }),
    );
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.code).toBe("VALIDATION");
  });

  it("POST /api/simulate rejects unknown product", async () => {
    const res = await simulatePost(
      new Request("http://localhost/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "does-not-exist" }),
      }),
    );
    expect(res.status).toBe(404);
  });

  it("POST /api/simulate returns mock simulation", async () => {
    const selfie = readFileSync(join(process.cwd(), "public/demo-selfie.jpg"));
    const form = new FormData();
    form.append(
      "image",
      new File([selfie], "demo-selfie.jpg", { type: "image/jpeg" }),
    );
    const analyzed = await (
      await analyzePost(
        new Request("http://localhost/api/analyze", {
          method: "POST",
          body: form,
        }),
      )
    ).json();

    const productId = analyzed.products[0].id;
    const res = await simulatePost(
      new Request("http://localhost/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          fileId: analyzed.analysis.fileId,
        }),
      }),
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.simulation.mode).toBe("mock");
    expect(json.simulation.afterImageUrl).toMatch(/^data:image\/svg\+xml/);
  });
});
