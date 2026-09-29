import type { CatalogProduct, ConcernScore, MatchedProduct } from "./types";
import catalog from "@/data/catalog.json";

const products = catalog as CatalogProduct[];

function severity(score: number): number {
  // YouCam-style scores: higher often = worse for concerns; normalize 0–100
  return Math.max(0, Math.min(100, score));
}

export function matchProducts(concerns: ConcernScore[], limit = 4): MatchedProduct[] {
  const byKey = new Map(concerns.map((c) => [c.key, severity(c.score)]));

  const ranked = products
    .map((product) => {
      let matchScore = 0;
      const hits: string[] = [];
      for (const key of product.concerns) {
        const s = byKey.get(key) ?? 0;
        if (s >= 35) {
          matchScore += s;
          hits.push(`${key} (${Math.round(s)})`);
        }
      }
      matchScore = matchScore / Math.max(1, product.concerns.length);
      const why =
        hits.length > 0
          ? `Mapped to your elevated concerns: ${hits.slice(0, 3).join(", ")}.`
          : "Broad maintenance pick from the curated catalog.";
      return { ...product, matchScore, why };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return ranked.slice(0, limit);
}

export function getProduct(id: string): CatalogProduct | undefined {
  return products.find((p) => p.id === id);
}

export function listCatalog(): CatalogProduct[] {
  return products;
}
