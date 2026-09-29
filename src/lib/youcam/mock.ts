import type { AnalysisResult, ConcernScore, SimulationMap } from "../types";

const MOCK_CONCERNS: ConcernScore[] = [
  { key: "pore", label: "Pores", score: 72, region: "cheek" },
  { key: "oiliness", label: "Oiliness", score: 68, region: "T-zone" },
  { key: "texture", label: "Texture", score: 54 },
  { key: "acne", label: "Acne", score: 41 },
  { key: "moisture", label: "Moisture", score: 38 },
  { key: "radiance", label: "Radiance", score: 45 },
  { key: "dark_circle", label: "Dark circles", score: 33 },
  { key: "wrinkle", label: "Wrinkles", score: 22 },
];

export function mockAnalysis(): AnalysisResult {
  return {
    mode: "mock",
    fileId: "mock-file-id",
    concerns: MOCK_CONCERNS,
    skinType: "Combination",
    summary:
      "Mock cast: elevated pores and oiliness on a combination skin profile. Add YOUCAM_API_KEY for live YouCam Skin Analysis.",
    rawNote: "mock",
  };
}

/** SVG placeholder “after” image for mock simulation (data URL). */
export function mockSimulationImage(intensities: SimulationMap): string {
  const labels = Object.entries(intensities)
    .filter(([, v]) => typeof v === "number" && v > 0)
    .map(([k, v]) => `${k} ${(v as number).toFixed(2)}`)
    .join(" · ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d8ebe3"/>
      <stop offset="100%" stop-color="#b7d4c8"/>
    </linearGradient>
  </defs>
  <rect width="640" height="800" fill="url(#g)"/>
  <ellipse cx="320" cy="340" rx="170" ry="210" fill="#f3ebe3" stroke="#2a3a34" stroke-width="3"/>
  <circle cx="260" cy="310" r="14" fill="#2a3a34"/>
  <circle cx="380" cy="310" r="14" fill="#2a3a34"/>
  <path d="M270 410 Q320 445 370 410" fill="none" stroke="#2a3a34" stroke-width="4" stroke-linecap="round"/>
  <text x="320" y="620" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#1c2b26">Mock after-cast</text>
  <text x="320" y="660" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#3d544c">${labels || "simulation"}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
