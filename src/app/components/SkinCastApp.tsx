"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { AnalysisResult, MatchedProduct, SimulateResult } from "@/lib/types";

type Step = "land" | "upload" | "results" | "simulate" | "cart";

type Health = { youcamLive: boolean; mode: string };

const STEPS: { id: Step; label: string }[] = [
  { id: "upload", label: "Selfie" },
  { id: "results", label: "Analysis" },
  { id: "simulate", label: "Simulate" },
  { id: "cart", label: "Cart" },
];

function stepIndex(step: Step) {
  if (step === "land") return -1;
  return STEPS.findIndex((s) => s.id === step);
}

export default function SkinCastApp() {
  const [step, setStep] = useState<Step>("land");
  const [health, setHealth] = useState<Health | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewLocal, setPreviewLocal] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("Working…");
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [products, setProducts] = useState<MatchedProduct[]>([]);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<MatchedProduct | null>(null);
  const [simulation, setSimulation] = useState<SimulateResult | null>(null);
  const [cart, setCart] = useState<MatchedProduct[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [slider, setSlider] = useState(55);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setHealth({ youcamLive: !!d.youcamLive, mode: d.mode }))
      .catch(() => setHealth({ youcamLive: false, mode: "mock" }));
  }, []);

  function chooseFile(next: File | null) {
    setPreviewLocal((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return next ? URL.createObjectURL(next) : null;
    });
    setFile(next);
  }

  const modeLabel = health?.youcamLive ? "Live YouCam" : "Demo mode";
  const activeIdx = stepIndex(step);

  const topConcerns = useMemo(
    () => (analysis?.concerns ?? []).slice(0, 5),
    [analysis],
  );

  async function runAnalysis() {
    if (!file) return;
    setBusy(true);
    setBusyLabel("Running YouCam skin analysis…");
    setError(null);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch("/api/analyze", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalysis(data.analysis);
      setProducts(data.products ?? []);
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
    setBusyLabel(`Simulating ${product.name}…`);
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
      setSlider(55);
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
    setJustAdded(true);
    setStep("cart");
  }

  function resetCast() {
    setStep("land");
    chooseFile(null);
    setAnalysis(null);
    setProducts([]);
    setSimulation(null);
    setSelected(null);
    setPreviewDataUrl(null);
    setJustAdded(false);
    setError(null);
  }

  const onLand = step === "land";

  return (
    <div
      className={
        onLand
          ? "relative flex w-full flex-1 flex-col"
          : "relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-20 pt-5 sm:px-8 sm:pt-6"
      }
    >
      <header
        className={
          onLand
            ? "absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 pt-5 sm:px-10 sm:pt-6"
            : "z-20 flex items-center justify-between gap-4"
        }
      >
        <button
          type="button"
          onClick={() => setStep("land")}
          className={`font-[family-name:var(--font-fraunces)] text-2xl tracking-tight sm:text-[1.7rem] ${
            onLand ? "text-[var(--foam)]" : "text-[var(--deep)]"
          }`}
        >
          SkinCast
        </button>
        <div
          className={`flex items-center gap-3 text-sm ${
            onLand ? "text-white/80" : "text-[var(--ink-soft)]"
          }`}
        >
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
              health?.youcamLive
                ? "bg-[var(--deep)] text-[var(--foam)]"
                : onLand
                  ? "bg-white/15 text-[var(--foam)]"
                  : "bg-[var(--sand)] text-[var(--ink-soft)]"
            }`}
          >
            {modeLabel}
          </span>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setStep("cart")}
              className={`font-medium underline-offset-4 hover:underline ${
                onLand ? "text-[var(--foam)]" : "text-[var(--deep)]"
              }`}
            >
              Cart ({cart.length})
            </button>
          )}
        </div>
      </header>

      {!onLand && (
        <nav
          aria-label="Cast progress"
          className="step-rail animate-fade mt-5 border-b border-[var(--mist)]/80 pb-3"
        >
          {STEPS.map((s, i) => {
            const done = i < activeIdx;
            const current = i === activeIdx;
            return (
              <div
                key={s.id}
                className={`flex shrink-0 items-center gap-2 px-2 text-xs sm:text-sm ${
                  current
                    ? "font-semibold text-[var(--deep)]"
                    : done
                      ? "text-[var(--sage)]"
                      : "text-[var(--ink-soft)]/55"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center text-[10px] ${
                    current || done
                      ? "bg-[var(--deep)] text-[var(--foam)]"
                      : "bg-[var(--sand)] text-[var(--ink-soft)]"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {s.label}
                {i < STEPS.length - 1 && (
                  <span className="ml-1 hidden h-px w-6 bg-[var(--mist)] sm:block" />
                )}
              </div>
            );
          })}
        </nav>
      )}

      {!health?.youcamLive && !onLand && (
        <p className="mt-4 animate-fade border border-[var(--mist)] bg-white/55 px-4 py-3 text-sm text-[var(--ink-soft)]">
          Demo mode — set{" "}
          <code className="text-[var(--deep)]">YOUCAM_API_KEY</code> in{" "}
          <code className="text-[var(--deep)]">.env.local</code> for live Skin
          Analysis + Simulation. Never commit the key.
        </p>
      )}

      {error && (
        <div
          role="alert"
          className={`mt-4 flex items-start justify-between gap-3 border border-[var(--coral)]/35 bg-[var(--coral)]/10 px-4 py-3 text-sm text-[var(--coral)] ${
            onLand ? "mx-5 sm:mx-10" : ""
          }`}
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="shrink-0 font-medium underline-offset-2 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {busy && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--deep)]/35 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
        >
          <div className="relative mx-4 w-full max-w-sm overflow-hidden border border-white/20 bg-[var(--foam)] px-6 py-8 text-center shadow-lg">
            <div className="loading-sheen absolute inset-x-0 top-0 h-1" />
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-[var(--mist)] border-t-[var(--deep)] animate-spin" />
            <p className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--deep)]">
              Casting skin
            </p>
            <p className="mt-2 animate-pulse-soft text-sm text-[var(--ink-soft)]">
              {busyLabel}
            </p>
          </div>
        </div>
      )}

      {step === "land" && (
        <section
          className="hero-plane animate-fade flex min-h-[100svh] flex-1 flex-col justify-end px-5 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-32"
          style={
            {
              "--hero-image": "url(/hero-atmosphere.jpg)",
            } as CSSProperties
          }
        >
          <p className="animate-rise font-[family-name:var(--font-fraunces)] text-5xl leading-[0.92] text-[var(--foam)] sm:text-7xl md:text-8xl">
            SkinCast
          </p>
          <h1 className="animate-rise-delay mt-5 max-w-xl text-xl font-medium leading-snug text-[var(--foam)] sm:text-2xl">
            Cast your skin before you buy.
          </h1>
          <p className="animate-rise-delay mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            YouCam scores your concerns, we match products, then simulate the
            after — so the cart isn’t a guess.
          </p>
          <div className="animate-rise-late mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setStep("upload")}
              className="bg-[var(--foam)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] transition hover:bg-white"
            >
              Start skin cast
            </button>
            <a
              href="#disclaimer"
              className="text-sm text-white/75 underline-offset-4 hover:text-white hover:underline"
            >
              Wellness disclaimer
            </a>
          </div>
        </section>
      )}

      {step === "upload" && (
        <section className="mt-8 animate-rise sm:mt-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)] sm:text-4xl">
            Upload a selfie
          </h2>
          <p className="mt-2 max-w-lg text-[var(--ink-soft)]">
            Front-facing, even light, face filling most of the frame. Used only
            to run YouCam (or mock) analysis — not stored in an app database.
          </p>

          <label className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-4 border border-dashed border-[var(--sage)] bg-white/55 px-6 py-12 transition hover:bg-white/80">
            {previewLocal ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewLocal}
                alt="Selected selfie preview"
                className="h-48 w-36 object-cover sm:h-56 sm:w-42"
              />
            ) : (
              <span className="animate-breath flex h-14 w-14 items-center justify-center border border-[var(--mist)] bg-[var(--sand)] text-[var(--deep)]">
                +
              </span>
            )}
            <span className="text-sm font-medium text-[var(--deep)]">
              {file ? file.name : "Choose image (jpg / png / webp)"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => chooseFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!file || busy}
              onClick={runAnalysis}
              className="bg-[var(--deep)] px-6 py-3 text-sm font-semibold text-[var(--foam)] disabled:opacity-40"
            >
              Analyze with YouCam
            </button>
            <button
              type="button"
              onClick={() => setStep("land")}
              className="px-5 py-3 text-sm text-[var(--ink-soft)]"
            >
              Back
            </button>
          </div>
        </section>
      )}

      {step === "results" && analysis && (
        <section className="mt-8 animate-rise sm:mt-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="lg:w-[38%]">
              {previewDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewDataUrl}
                  alt="Your selfie"
                  className="w-full object-cover"
                />
              )}
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {analysis.summary}
              </p>
              {analysis.skinType && (
                <p className="mt-2 text-sm font-semibold text-[var(--deep)]">
                  Skin type signal: {analysis.skinType}
                </p>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)] sm:text-4xl">
                Concern cast
              </h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                YouCam concern scores — pick a match to simulate the after.
              </p>
              <ul className="mt-6 space-y-4">
                {topConcerns.map((c, i) => (
                  <li key={c.key} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">{c.label}</span>
                      <span className="tabular-nums text-[var(--ink-soft)]">
                        {Math.round(c.score)}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden bg-[var(--sand)]">
                      <div
                        className="animate-bar h-full bg-[var(--sage)]"
                        style={{
                          width: `${Math.min(100, c.score)}%`,
                          animationDelay: `${0.15 + i * 0.08}s`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 font-[family-name:var(--font-fraunces)] text-2xl text-[var(--deep)]">
                Matched products
              </h3>
              {products.length === 0 ? (
                <p className="mt-4 border border-[var(--mist)] bg-white/50 px-4 py-6 text-sm text-[var(--ink-soft)]">
                  No catalog matches for this cast. Try another selfie or check
                  the demo catalog.
                </p>
              ) : (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      disabled={busy}
                      onClick={() => runSimulate(p)}
                      className="border border-[var(--mist)] bg-white/70 p-4 text-left transition hover:border-[var(--sage)] hover:bg-white"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sage)]">
                        {p.brand}
                      </div>
                      <div className="mt-1 font-semibold text-[var(--ink)]">
                        {p.name}
                      </div>
                      <p className="mt-2 text-sm text-[var(--ink-soft)]">
                        {p.summary}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                        {p.why}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="tabular-nums">${p.price}</span>
                        <span className="font-semibold text-[var(--deep)]">
                          Simulate →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {step === "simulate" && selected && simulation && (
        <section className="mt-8 animate-rise sm:mt-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)] sm:text-4xl">
            Before / after
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            {selected.name} · intensities from product claims ·{" "}
            {simulation.mode}
          </p>

          <div className="relative mt-8 overflow-hidden border border-[var(--mist)] bg-[var(--sand)]">
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
                className="absolute inset-y-0 w-0.5 bg-white/95"
                style={{ left: `${slider}%` }}
              >
                <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-[10px] font-bold tracking-wide text-[var(--deep)] shadow">
                  ‖
                </span>
              </div>
              <span className="absolute left-3 top-3 bg-[var(--deep)]/75 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Before
              </span>
              <span className="absolute right-3 top-3 bg-[var(--foam)]/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--deep)]">
                After
              </span>
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
              className="bg-[var(--coral)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Add to cart — ${selected.price}
            </button>
            <button
              type="button"
              onClick={() => setStep("results")}
              className="px-5 py-3 text-sm text-[var(--ink-soft)]"
            >
              Try another product
            </button>
          </div>
        </section>
      )}

      {step === "cart" && (
        <section className="mt-8 animate-rise sm:mt-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)] sm:text-4xl">
            Cart
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Mock checkout for the hackathon MVP — no real payments.
          </p>

          {justAdded && cart.length > 0 && (
            <p
              role="status"
              className="mt-5 animate-rise border border-[var(--sage)]/40 bg-[var(--sage)]/10 px-4 py-3 text-sm font-medium text-[var(--deep)]"
            >
              Added to cart — you’re cast-ready.
            </p>
          )}

          {cart.length === 0 ? (
            <div className="mt-8 border border-[var(--mist)] bg-white/50 px-5 py-10 text-center">
              <p className="text-[var(--ink-soft)]">Your cart is empty.</p>
              <button
                type="button"
                onClick={() => setStep(analysis ? "results" : "upload")}
                className="mt-4 bg-[var(--deep)] px-5 py-2.5 text-sm font-semibold text-[var(--foam)]"
              >
                {analysis ? "Back to matches" : "Start a cast"}
              </button>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {cart.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between border border-[var(--mist)] bg-white/70 px-4 py-4"
                >
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-[var(--ink-soft)]">{p.brand}</div>
                  </div>
                  <div className="tabular-nums">${p.price}</div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <p className="mt-8 bg-[var(--deep)] px-5 py-5 text-sm leading-relaxed text-[var(--foam)]">
              You’re cast-ready. In a full launch this would hand off to Shopify
              / checkout. For judges: the YouCam analysis → simulation → cart
              path is the product.
            </p>
          )}

          <button
            type="button"
            onClick={resetCast}
            className="mt-6 border border-[var(--deep)] px-5 py-3 text-sm font-medium text-[var(--deep)]"
          >
            New cast
          </button>
        </section>
      )}

      <footer
        id="disclaimer"
        className={`border-t border-[var(--mist)] text-xs leading-relaxed text-[var(--ink-soft)] ${
          onLand
            ? "bg-[var(--foam)] px-5 pb-10 pt-6 sm:px-10"
            : "mt-16 pt-6"
        }`}
      >
        {onLand && !health?.youcamLive && (
          <p className="mb-3 text-[var(--ink-soft)]">
            Demo mode — set <code className="text-[var(--deep)]">YOUCAM_API_KEY</code>{" "}
            for live YouCam Analysis + Simulation. Never commit the key.
          </p>
        )}
        SkinCast is a retail wellness demo — not medical advice or diagnosis.
        YouCam Skin Analysis and Skin Simulation power the visual evidence.
        Secrets stay in server env only.
      </footer>
    </div>
  );
}
