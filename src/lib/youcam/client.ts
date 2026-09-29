import type { ConcernKey, ConcernScore, SimulationMap } from "../types";

const DEFAULT_BASE = "https://yce-api-01.makeupar.com";

export function getYouCamConfig() {
  const apiKey = process.env.YOUCAM_API_KEY?.trim() ?? "";
  const baseUrl = (process.env.YOUCAM_API_BASE_URL?.trim() || DEFAULT_BASE).replace(
    /\/$/,
    "",
  );
  return { apiKey, baseUrl, enabled: apiKey.length > 0 };
}

function authHeaders(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

type FileCreateResponse = {
  status?: number;
  data?: {
    files?: Array<{
      file_id?: string;
      requests?: Array<{
        method?: string;
        url?: string;
        headers?: Record<string, string>;
      }>;
    }>;
  };
  error?: string;
  error_code?: string;
};

export async function uploadImageToYouCam(
  bytes: ArrayBuffer,
  contentType: string,
  fileName: string,
): Promise<string> {
  const { apiKey, baseUrl } = getYouCamConfig();
  if (!apiKey) throw new Error("YOUCAM_API_KEY is not set");

  const createRes = await fetch(`${baseUrl}/s2s/v2.0/file`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      files: [
        {
          content_type: contentType === "image/jpeg" ? "image/jpg" : contentType,
          file_name: fileName,
          file_size: bytes.byteLength,
        },
      ],
    }),
  });

  const createJson = (await createRes.json()) as FileCreateResponse;
  if (!createRes.ok) {
    throw new Error(
      createJson.error || createJson.error_code || `File API failed (${createRes.status})`,
    );
  }

  const file = createJson.data?.files?.[0];
  const fileId = file?.file_id;
  const uploadReq = file?.requests?.[0];
  if (!fileId || !uploadReq?.url) {
    throw new Error("File API response missing file_id or upload URL");
  }

  const putHeaders: Record<string, string> = {
    ...(uploadReq.headers ?? {}),
  };
  if (!putHeaders["Content-Type"] && !putHeaders["content-type"]) {
    putHeaders["Content-Type"] = contentType === "image/jpeg" ? "image/jpg" : contentType;
  }

  const putRes = await fetch(uploadReq.url, {
    method: uploadReq.method || "PUT",
    headers: putHeaders,
    body: Buffer.from(bytes),
  });

  if (!putRes.ok) {
    throw new Error(`Upload to YouCam storage failed (${putRes.status})`);
  }

  return fileId;
}

type TaskCreateResponse = {
  status?: number;
  data?: { task_id?: string };
  error?: string;
  error_code?: string;
};

type TaskPollResponse = {
  status?: number;
  data?: {
    task_id?: string;
    task_status?: string;
    results?: unknown;
    error?: string;
    error_code?: string;
    [key: string]: unknown;
  };
  error?: string;
  error_code?: string;
};

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function createAndPoll(
  createPath: string,
  pollPathPrefix: string,
  body: Record<string, unknown>,
  opts?: { intervalMs?: number; maxAttempts?: number },
): Promise<TaskPollResponse["data"]> {
  const { apiKey, baseUrl } = getYouCamConfig();
  if (!apiKey) throw new Error("YOUCAM_API_KEY is not set");

  const createRes = await fetch(`${baseUrl}${createPath}`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify(body),
  });
  const createJson = (await createRes.json()) as TaskCreateResponse;
  if (!createRes.ok || !createJson.data?.task_id) {
    throw new Error(
      createJson.error ||
        createJson.error_code ||
        `Task create failed (${createRes.status})`,
    );
  }

  const taskId = createJson.data.task_id;
  const interval = opts?.intervalMs ?? 2500;
  const maxAttempts = opts?.maxAttempts ?? 40;

  for (let i = 0; i < maxAttempts; i++) {
    await sleep(interval);
    const pollRes = await fetch(`${baseUrl}${pollPathPrefix}/${taskId}`, {
      method: "GET",
      headers: authHeaders(apiKey),
    });
    const pollJson = (await pollRes.json()) as TaskPollResponse;
    const status = pollJson.data?.task_status?.toLowerCase();
    if (status === "success") return pollJson.data;
    if (status === "error") {
      throw new Error(
        pollJson.data?.error ||
          pollJson.data?.error_code ||
          pollJson.error ||
          pollJson.error_code ||
          "YouCam task error",
      );
    }
  }

  throw new Error("YouCam task timed out while polling");
}

const HD_ACTIONS = [
  "hd_acne",
  "hd_pore",
  "hd_texture",
  "hd_oiliness",
  "hd_moisture",
  "hd_wrinkle",
  "hd_dark_circle",
  "hd_radiance",
  "hd_skin_type",
] as const;

const LABEL: Record<string, string> = {
  acne: "Acne",
  pore: "Pores",
  texture: "Texture",
  oiliness: "Oiliness",
  moisture: "Moisture",
  wrinkle: "Wrinkles",
  dark_circle: "Dark circles",
  radiance: "Radiance",
  redness: "Redness",
  eye_bag: "Eye bags",
  age_spot: "Age spots",
  firmness: "Firmness",
  skin_type: "Skin type",
};

function normalizeKey(raw: string): ConcernKey | null {
  const k = raw.replace(/^hd_/, "").toLowerCase();
  const map: Record<string, ConcernKey> = {
    acne: "acne",
    pore: "pore",
    pores: "pore",
    texture: "texture",
    oiliness: "oiliness",
    moisture: "moisture",
    wrinkle: "wrinkle",
    wrinkles: "wrinkle",
    dark_circle: "dark_circle",
    darkcircle: "dark_circle",
    radiance: "radiance",
    redness: "redness",
    eye_bag: "eye_bag",
    eyebag: "eye_bag",
    age_spot: "age_spot",
    agespot: "age_spot",
    firmness: "firmness",
    skin_type: "skin_type",
    skintype: "skin_type",
  };
  return map[k] ?? null;
}

function scoreFromUnknown(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    for (const key of ["score", "value", "severity", "ui_score", "percentage"]) {
      if (typeof o[key] === "number") return o[key] as number;
    }
  }
  return null;
}

/** Best-effort parse of format=json analysis payloads (schema varies by concern). */
export function parseAnalysisConcerns(results: unknown): {
  concerns: ConcernScore[];
  skinType?: string;
} {
  const concerns: ConcernScore[] = [];
  let skinType: string | undefined;

  const visit = (node: unknown, hintKey?: string) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((n) => visit(n, hintKey));
      return;
    }
    const obj = node as Record<string, unknown>;
    if (typeof obj.skin_type === "string") skinType = obj.skin_type;
    if (typeof obj.type === "string" && hintKey === "skin_type") skinType = obj.type;

    for (const [k, v] of Object.entries(obj)) {
      const nk = normalizeKey(k);
      if (nk && nk !== "skin_type") {
        const score = scoreFromUnknown(v);
        if (score != null) {
          concerns.push({
            key: nk,
            label: LABEL[nk] ?? nk,
            score: score > 1 && score <= 100 ? score : score <= 1 ? score * 100 : score,
          });
          continue;
        }
      }
      if (k === "score_info" || k === "results" || k === "output" || k === "data") {
        visit(v);
      } else if (nk) {
        visit(v, nk);
      }
    }
  };

  visit(results);

  // de-dupe by key keeping max score
  const map = new Map<ConcernKey, ConcernScore>();
  for (const c of concerns) {
    const prev = map.get(c.key);
    if (!prev || c.score > prev.score) map.set(c.key, c);
  }
  return { concerns: [...map.values()].sort((a, b) => b.score - a.score), skinType };
}

export async function runSkinAnalysis(fileId: string) {
  const data = await createAndPoll(
    "/s2s/v2.1/task/skin-analysis",
    "/s2s/v2.1/task/skin-analysis",
    {
      src_file_id: fileId,
      dst_actions: [...HD_ACTIONS],
      format: "json",
    },
  );

  const parsed = parseAnalysisConcerns(data?.results ?? data);
  return { ...parsed, raw: data };
}

function extractResultImageUrl(data: Record<string, unknown> | undefined): string | null {
  if (!data) return null;
  const results = data.results;
  if (typeof results === "string" && results.startsWith("http")) return results;
  if (results && typeof results === "object") {
    const r = results as Record<string, unknown>;
    for (const key of ["url", "result_url", "dst_url", "image_url", "output_url"]) {
      if (typeof r[key] === "string") return r[key] as string;
    }
    if (Array.isArray(r.urls) && typeof r.urls[0] === "string") return r.urls[0];
  }
  for (const key of ["result_url", "url", "dst_url"]) {
    if (typeof data[key] === "string") return data[key] as string;
  }
  return null;
}

export async function runSkinSimulation(fileId: string, intensities: SimulationMap) {
  const body: Record<string, unknown> = { src_file_id: fileId };
  for (const [k, v] of Object.entries(intensities)) {
    if (typeof v === "number" && v > 0) body[k] = v;
  }

  const data = await createAndPoll(
    "/s2s/v2.0/task/skin-simulation",
    "/s2s/v2.0/task/skin-simulation",
    body,
  );

  const url = extractResultImageUrl(data as Record<string, unknown>);
  if (!url) {
    throw new Error("Skin simulation succeeded but no result image URL was found");
  }
  return { imageUrl: url, raw: data };
}
