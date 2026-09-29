import { test, expect } from "@playwright/test";
import path from "node:path";

test.describe("SkinCast critical path (mock)", () => {
  test("landing + health + analyze → simulate → cart", async ({
    page,
    request,
  }) => {
    const health = await request.get("/api/health");
    expect(health.ok()).toBeTruthy();
    const healthJson = await health.json();
    expect(healthJson.mode).toBe("mock");
    expect(healthJson.youcamLive).toBe(false);

    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "SkinCast" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Cast your skin before you buy/i }),
    ).toBeVisible();
    await expect(page.getByText("Demo mode").first()).toBeVisible();

    await page.getByRole("button", { name: "Start skin cast" }).click();
    await expect(
      page.getByRole("button", { name: /Analyze with YouCam/i }),
    ).toBeVisible();

    const selfie = path.join(process.cwd(), "public/demo-selfie.jpg");
    await page.locator('input[type="file"]').setInputFiles(selfie);
    await page.getByRole("button", { name: /Analyze with YouCam/i }).click();

    await expect(page.getByText(/Pores|Oiliness|Texture/i).first()).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.getByText(/not medical advice/i).first()).toBeVisible();

    await page.getByRole("button", { name: /Simulate/i }).first().click();
    await expect(
      page
        .getByText(/Simulated appearance|Illustrative|not a clinical/i)
        .first(),
    ).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: /Add to cart/i }).first().click();
    await expect(page.getByText(/Mock cart|no payments/i).first()).toBeVisible();
  });

  test("analyze API validation smoke", async ({ request }) => {
    const bad = await request.post("/api/analyze", {
      multipart: {
        image: {
          name: "bad.txt",
          mimeType: "text/plain",
          buffer: Buffer.from("nope"),
        },
      },
    });
    expect(bad.status()).toBe(400);
    const json = await bad.json();
    expect(json.code).toBe("VALIDATION");
  });
});
