# API Integration — YouCam Skin Analysis + Skin Simulation

SkinCast server-side integration notes. **No secrets in this file.**  
Base URL: `https://yce-api-01.makeupar.com`  
Auth: `Authorization: Bearer <YOUCAM_API_KEY>` (server env only)

Official refs: [Skin Analysis v2.1](https://docs.perfectcorp.com/reference/ai_skin_analysis/v2.1) · [Skin Simulation](https://docs.perfectcorp.com/reference/ai_skin_simulation/section/overview/integration-guide) · [Quick start](https://docs.perfectcorp.com/develop/quick_start_guide)

---

## Modes

| Mode | When | Behavior |
|------|------|----------|
| **Production** | `YOUCAM_API_KEY` set | Real File + Analysis + Simulation APIs |
| **Mock** | Key missing / empty | Deterministic fake scores + placeholder before/after; full UI path works |

Never ship the Bearer token to the browser (`NEXT_PUBLIC_*` forbidden for this key).

---

## Shared async pattern

1. Obtain image as `src_file_id` (File API) **or** publicly reachable `src_file_url`.
2. `POST` task → `data.task_id`.
3. Poll `GET …/{task_id}` every ~2–10s until `task_status` is `success` or `error` (results valid ~24h).
4. Read JSON / result image URLs.

MVP SkinCast uses **server-side upload to File API** from the user’s multipart upload (no long-lived app storage).

---

## File upload

```
POST /s2s/v2.0/file
Authorization: Bearer <key>
Content-Type: application/json
```

Typical flow (per Perfect Corp quick start):

1. Request an upload URL + `file_id`.
2. `PUT`/`POST` binary to the returned upload URL.
3. Pass `src_file_id` into analysis / simulation tasks.

Alternative: host a short-lived public URL (Vercel Blob / R2) and pass `src_file_url`. Prefer ephemeral; delete after success when using Blob.

---

## Skin Analysis v2.1

| | |
|--|--|
| Create | `POST /s2s/v2.1/task/skin-analysis` |
| Poll | `GET /s2s/v2.1/task/skin-analysis/{task_id}` |

### Create body (MVP)

```json
{
  "src_file_id": "<from file API>",
  "dst_actions": [
    "hd_acne",
    "hd_pore",
    "hd_texture",
    "hd_oiliness",
    "hd_moisture",
    "hd_wrinkle",
    "hd_dark_circle",
    "hd_radiance",
    "hd_skin_type"
  ],
  "format": "json"
}
```

Rules:

- HD and SD actions **must not be mixed**.
- MVP uses a **subset of HD** concerns to control latency and units.
- `format: "json"` preferred for app parsing (vs zip of overlays).

### App mapping

Normalize scores into `{ concern, label, score, region? }[]` for UI + catalog matcher. Higher severity → stronger match weight for products tagged with that concern.

---

## Skin Simulation v2.0

| | |
|--|--|
| Create | `POST /s2s/v2.0/task/skin-simulation` |
| Poll | `GET /s2s/v2.0/task/skin-simulation/{task_id}` |

### Create body (shape)

Provide `src_file_id` **or** `src_file_url`, plus concern intensities **0.0–1.0** (at least one &gt; 0):

```json
{
  "src_file_id": "<same selfie file id>",
  "wrinkle": 0.0,
  "pores": 0.55,
  "texture": 0.4,
  "acne": 0.35,
  "oiliness": 0.5,
  "radiance": 0.3,
  "redness": 0.0,
  "dark_circle": 0.0
}
```

Exact field names follow Perfect Corp Skin Simulation API (wrinkle, pores, radiance, acne, oiliness, eye bags, dark circles, spots, texture, redness — confirm against live docs if a call returns `InvalidParameters`).

Catalog SKUs store a `simulation` map of intensities derived from product claims. Selecting a product copies that map into the simulate request.

### Result

On `success`, response includes a result image URL (simulated “after”). UI shows original selfie vs simulated image (before/after slider).

---

## App routes (SkinCast)

| Route | Role |
|-------|------|
| `POST /api/analyze` | Multipart `image` → mock or YouCam analysis + product matches |
| `POST /api/simulate` | JSON `{ fileId?|imageMeta, productId }` → mock or YouCam simulation |
| `GET /api/health` | Reports whether production YouCam mode is active (boolean only; no secrets) |

---

## Errors & demo resilience

| Situation | Handling |
|-----------|----------|
| Missing API key | Mock mode; banner “Demo mode — add YOUCAM_API_KEY for live YouCam” |
| `CreditInsufficiency` | Surface friendly error; do not retry burn |
| Face too small / lighting | Return actionable message from YouCam `error_code` |
| Poll timeout | Abort with retry CTA |

---

## Units (budget awareness)

Hackathon allotment ~1,000 units. Plan ~1–3 analysis + 1–2 simulations per demo path. Avoid HD full concern sets in loops; cache per session in memory when safe.

---

## Env

See `.env.example`:

- `YOUCAM_API_KEY=`
- `YOUCAM_API_BASE_URL=https://yce-api-01.makeupar.com`
