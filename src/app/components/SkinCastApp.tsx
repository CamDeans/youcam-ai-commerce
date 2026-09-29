"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnalysisResult, MatchedProduct, SimulateResult } from "@/lib/types";

type Step = "land" | "upload" | "results" | "simulate" | "cart";

type Health = { youcamLive: boolean; mode: string };

export default function SkinCastApp() {
  const [step, setStep] = useState<Step>("land");
  const [health, setHealth] = useState<Health | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [products, setProducts] = useState<MatchedProduct[]>([]);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<MatchedProduct | null>(null);
  const [simulation, setSimulation] = useState<SimulateResult | null>(null);
  const [cart, setCart] = useState<MatchedProduct[]>([]);
  const [slider, setSlider] = useState(55);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setHealth({ youcamLive: !!d.youcamLive, mode: d.mode }))
      .catch(() => setHealth({ youcamLive: false, mode: "mock" }));
  }, []);

  const modeLabel = health?.youcamLive ? "Live YouCam" : "Demo mock";

  const topConcerns = useMemo(
    () => (analysis?.concerns ?? []).slice(0, 5),
    [analysis],
  );

  async function runAnalysis() {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch("/api/analyze", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalysis(data.analysis);
      setProducts(data.products);
      setPreviewDataUrl(data.previewDataUrl);
      setStep("results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setBusy(false);
    }
  }

  async function runSimulate(product: MatchedProduct) {
    setSelected(product);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          fileId: analysis?.fileId,
          previewDataUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Simulation failed");
      setSimulation(data.simulation);
      setStep("simulate");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Simulation failed");
    } finally {
      setBusy(false);
    }
  }

  function addToCart() {
    if (!selected) return;
    setCart((prev) =>
      prev.some((p) => p.id === selected.id) ? prev : [...prev, selected],
    );
    setStep("cart");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <div className="font-[family-name:var(--font-fraunces)] text-2xl tracking-tight text-[var(--deep)] sm:text-3xl">
          SkinCast
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              health?.youcamLive
                ? "bg-[var(--deep)] text-[var(--foam)]"
                : "bg-[var(--sand)] text-[var(--ink-soft)]"
            }`}
          >
            {modeLabel}
          </span>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="underline-offset-4 hover:underline"
            >
              Cart ({cart.length})
            </button>
          )}
        </div>
      </header>

      {!health?.youcamLive && (
        <p className="mt-4 animate-rise rounded-lg border border-[var(--mist)] bg-white/50 px-4 py-3 text-sm text-[var(--ink-soft)]">
          Demo mode — set <code className="text-[var(--deep)]">YOUCAM_API_KEY</code> in{" "}
          <code className="text-[var(--deep)]">.env.local</code> for live Skin Analysis +
          Simulation. Never commit the key.
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg border border-[var(--coral)]/40 bg-[var(--coral)]/10 px-4 py-3 text-sm text-[var(--coral)]">
          {error}
        </p>
      )}

      {step === "land" && (
        <section className="relative mt-10 flex flex-1 flex-col justify-center overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(145deg,#f7fbf8_0%,#d9ebe3_48%,#c5ddd2_100%)] px-6 py-16 sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.7), transparent 40%), radial-gradient(circle at 20% 80%, rgba(36,64,55,0.12), transparent 45%)",
            }}
          />
          <p className="animate-rise font-[family-name:var(--font-fraunces)] text-5xl leading-[0.95] text-[var(--deep)] sm:text-7xl">
            SkinCast
          </p>
          <h1 className="animate-rise-delay mt-6 max-w-xl text-2xl font-medium leading-snug text-[var(--ink)] sm:text-3xl">
            Cast your skin before you buy.
          </h1>
          <p className="animate-rise-delay mt-4 max-w-md text-base text-[var(--ink-soft)] sm:text-lg">
            YouCam scores your concerns, we match products, then simulate the after —
            so the cart isn’t a guess.
          </p>
          <div className="animate-rise-delay mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep("upload")}
              className="rounded-full bg-[var(--deep)] px-6 py-3 text-sm font-semibold text-[var(--foam)] transition hover:bg-[var(--ink)]"
            >
              Start skin cast
            </button>
            <a
              href="#disclaimer"
              className="rounded-full px-5 py-3 text-sm text-[var(--ink-soft)] underline-offset-4 hover:underline"
            >
              Wellness disclaimer
            </a>
          </div>
        </section>
      )}

      {step === "upload" && (
        <section className="mt-10 animate-rise">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)]">
            Upload a selfie
          </h2>
          <p className="mt-2 max-w-lg text-[var(--ink-soft)]">
            Front-facing, even light, face filling most of the frame. Used only to run
            YouCam (or mock) analysis — not stored in an app database.
          </p>
          <label className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--sage)] bg-white/60 px-6 py-14 transition hover:bg-white/80">
            <span className="text-sm font-medium text-[var(--deep)]">
              {file ? file.name : "Choose image (jpg/png)"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!file || busy}
              onClick={runAnalysis}
              className="rounded-full bg-[var(--deep)] px-6 py-3 text-sm font-semibold text-[var(--foam)] disabled:opacity-40"
            >
              {busy ? "Casting…" : "Analyze with YouCam"}
            </button>
            <button
              type="button"
              onClick={() => setStep("land")}
              className="rounded-full px-5 py-3 text-sm text-[var(--ink-soft)]"
            >
              Back
            </button>
          </div>
          {busy && (
            <p className="animate-pulse-soft mt-4 text-sm text-[var(--sage)]">
              Running skin analysis…
            </p>
          )}
        </section>
      )}

      {step === "results" && analysis && (
        <section className="mt-10 animate-rise">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-2/5">
              {previewDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewDataUrl}
                  alt="Your selfie"
                  className="w-full rounded-2xl object-cover shadow-sm"
                />
              )}
              <p className="mt-3 text-sm text-[var(--ink-soft)]">{analysis.summary}</p>
              {analysis.skinType && (
                <p className="mt-1 text-sm font-medium text-[var(--deep)]">
                  Skin type signal: {analysis.skinType}
                </p>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)]">
                Concern cast
              </h2>
              <ul className="mt-4 space-y-3">
                {topConcerns.map((c) => (
                  <li key={c.key}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{c.label}</span>
                      <span className="tabular-nums text-[var(--ink-soft)]">
                        {Math.round(c.score)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--sand)]">
                      <div
                        className="h-full rounded-full bg-[var(--sage)] transition-all duration-700"
                        style={{ width: `${Math.min(100, c.score)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-[family-name:var(--font-fraunces)] text-2xl text-[var(--deep)]">
                Matched products
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    disabled={busy}
                    onClick={() => runSimulate(p)}
                    className="rounded-2xl border border-[var(--mist)] bg-white/70 p-4 text-left transition hover:border-[var(--sage)] hover:bg-white"
                  >
                    <div className="text-xs uppercase tracking-wide text-[var(--sage)]">
                      {p.brand}
                    </div>
                    <div className="mt-1 font-semibold text-[var(--ink)]">{p.name}</div>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{p.summary}</p>
                    <p className="mt-2 text-xs text-[var(--ink-soft)]">{p.why}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span>${p.price}</span>
                      <span className="font-medium text-[var(--deep)]">Simulate →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {step === "simulate" && selected && simulation && (
        <section className="mt-10 animate-rise">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)]">
            Before / after — {selected.name}
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Simulation intensities from product claims · mode: {simulation.mode}
          </p>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[var(--mist)] bg-[var(--sand)]">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
              {simulation.beforeDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={simulation.beforeDataUrl}
                  alt="Before"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={simulation.afterImageUrl}
                alt="After simulation"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `inset(0 0 0 ${slider}%)` }}
              />
              <div
                className="absolute inset-y-0 w-0.5 bg-white/90 shadow"
                style={{ left: `${slider}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="w-full px-4 py-4"
              aria-label="Before after slider"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addToCart}
              className="rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-semibold text-white"
            >
              Add to cart — ${selected.price}
            </button>
            <button
              type="button"
              onClick={() => setStep("results")}
              className="rounded-full px-5 py-3 text-sm text-[var(--ink-soft)]"
            >
              Try another product
            </button>
          </div>
        </section>
      )}

      {step === "cart" && (
        <section className="mt-10 animate-rise">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)]">
            Cart
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Mock checkout for the hackathon MVP — no real payments.
          </p>
          {cart.length === 0 ? (
            <p className="mt-8 text-[var(--ink-soft)]">Cart is empty.</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {cart.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--mist)] bg-white/70 px-4 py-4"
                >
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-[var(--ink-soft)]">{p.brand}</div>
                  </div>
                  <div>${p.price}</div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 rounded-xl bg-[var(--deep)] px-5 py-4 text-sm text-[var(--foam)]">
            You’re cast-ready. In a full launch this would hand off to Shopify / checkout.
            For judges: the YouCam analysis → simulation → cart path is the product.
          </p>
          <button
            type="button"
            onClick={() => {
              setStep("land");
              setFile(null);
              setAnalysis(null);
              setProducts([]);
              setSimulation(null);
              setSelected(null);
            }}
            className="mt-6 rounded-full border border-[var(--deep)] px-5 py-3 text-sm text-[var(--deep)]"
          >
            New cast
          </button>
        </section>
      )}

      <footer
        id="disclaimer"
        className="mt-16 border-t border-[var(--mist)] pt-6 text-xs leading-relaxed text-[var(--ink-soft)]"
      >
        SkinCast is a retail wellness demo — not medical advice or diagnosis. YouCam Skin
        Analysis and Skin Simulation power the visual evidence. Secrets stay in server
        env only.
      </footer>
    </div>
  );
}
