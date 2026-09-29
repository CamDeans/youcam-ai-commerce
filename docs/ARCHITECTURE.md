# Architecture — SkinCast

**Status:** Active (concept LOCKED by Lead 2026-09-29)  
**Related:** `docs/PRODUCT_DECISION.md` · `docs/API_INTEGRATION.md` · `docs/SECURITY.md`

---

## 1. Purpose

**SkinCast** lets shoppers cast their skin before buying: selfie → YouCam Skin Analysis → matched SKUs → YouCam Skin Simulation before/after → add to cart.

YouCam is essential: multi-concern scores and realistic skin simulation on the shopper’s face cannot be replaced by an LLM.

| Field | Value |
|-------|--------|
| Product name | SkinCast |
| One-line pitch | See how a skincare product would change *your* skin before you buy |
| Primary YouCam capability | Skin Analysis v2.1 + Skin Simulation v2.0 |
| Commerce action | Mock catalog add-to-cart (MVP) |

---

## 2. What the repo implies / chosen stack

Greenfield at discovery; Lead/Engineering locked:

| Layer | Choice |
|-------|--------|
| Framework | **Next.js App Router** (TypeScript) |
| Hosting | **Vercel** |
| YouCam calls | **Server-only** Route Handlers / server actions — Bearer never on client |
| Catalog | Local JSON mock (8–12 SKUs) |
| Images | Ephemeral: in-memory / request-scoped upload to YouCam File API; optional **Vercel Blob** or Cloudflare R2 later if a public URL is required — **minimize retention** |
| Auth | None for MVP demo |
| Payments | Out of scope (mock cart) |

---

## 3. High-level system

```
[Browser SkinCast UI]
        |  multipart selfie / product pick
        v
[Next.js Route Handlers]  ← YOUCAM_API_KEY (server env only)
        |-- POST YouCam file upload (or src_file_id flow)
        |-- POST/GET Skin Analysis v2.1
        |-- catalog matcher (scores → claim tags)
        |-- POST/GET Skin Simulation v2.0
        v
[Browser] scores + matched products + before/after + cart
```

### Components

| Component | Responsibility |
|-----------|----------------|
| `app/` UI | Landing, upload, results, before/after, cart |
| `app/api/analyze` | Accept selfie; run analysis (or mock); return concerns |
| `app/api/simulate` | Run simulation for selected product intensities (or mock) |
| `lib/youcam/*` | Client wrapper: auth header, upload, poll, parse |
| `data/catalog.json` | SKUs with claim→concern tags + simulation intensity maps |
| `lib/match.ts` | Rank products from analysis scores |

---

## 4. Vertical slice (MVP)

1. Land on SkinCast hero → CTA “Cast your skin”.
2. Upload selfie (consent + wellness disclaimer).
3. **Analysis** — YouCam when `YOUCAM_API_KEY` set; deterministic **mock** otherwise.
4. Show concern scores → **matched products**.
5. Select product → **Skin Simulation** (real or mock) → before/after.
6. **Add to cart** (in-memory / client cart; confirmation).

| Slice | Status |
|-------|--------|
| Slice 1 MVP (above) | In progress on `feat/skincast-mvp` |

---

## 5. Data & privacy

- Selfies used only to call YouCam or mock; do not persist to app DB in MVP.
- YouCam portal: uploaded pictures deleted ~24h; task results queryable ~24h.
- Prefer File API `src_file_id` over long-lived public URLs when possible.
- If Blob used: short TTL / delete after task success.
- No medical diagnosis language; retail wellness disclaimer on UI.
- See `docs/SECURITY.md`.

---

## 6. Environments

| Env | URL | Notes |
|-----|-----|-------|
| Local | `http://localhost:3000` | `.env.local` with optional `YOUCAM_API_KEY` |
| Production | **https://youcam-ai-commerce.vercel.app** | Mock until human sets `YOUCAM_API_KEY` in Vercel env |
| Preview | Vercel git aliases for PR branches | Same env pattern |

Vercel project: SOGIS / `youcam-ai-commerce`. See `docs/SECURITY.md` for where to add the key.

---

## 7. Non-goals (MVP)

- Real Shopify checkout / Stripe
- LLM agent chat (rule-based copy citing scores is enough)
- Camera Kit polish (upload-first)
- MirrorLane / ReturnShield features

---

## 8. Decision log

| Date | Decision | Owner |
|------|----------|-------|
| 2026-09-29 | SkinCast LOCKED over MirrorLane / ReturnShield | Lead |
| 2026-09-29 | Next.js App Router + Vercel; server-only YouCam | Engineering |
| 2026-09-29 | Mock mode when API key absent | Engineering |
