export type ConcernKey =
  | "acne"
  | "pore"
  | "texture"
  | "oiliness"
  | "moisture"
  | "wrinkle"
  | "dark_circle"
  | "radiance"
  | "redness"
  | "eye_bag"
  | "age_spot"
  | "firmness"
  | "skin_type";

export type ConcernScore = {
  key: ConcernKey;
  label: string;
  score: number;
  region?: string;
};

export type SimulationMap = Partial<
  Record<
    | "wrinkle"
    | "pores"
    | "texture"
    | "acne"
    | "oiliness"
    | "radiance"
    | "redness"
    | "dark_circle"
    | "eye_bag"
    | "spots",
    number
  >
>;

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  summary: string;
  concerns: ConcernKey[];
  actives: string[];
  simulation: SimulationMap;
};

export type MatchedProduct = CatalogProduct & {
  matchScore: number;
  why: string;
};

export type AnalysisResult = {
  mode: "live" | "mock";
  fileId?: string;
  concerns: ConcernScore[];
  skinType?: string;
  summary: string;
  rawNote?: string;
};

export type SimulateResult = {
  mode: "live" | "mock";
  productId: string;
  beforeDataUrl?: string;
  afterImageUrl: string;
  intensities: SimulationMap;
};
