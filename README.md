# SkinCast

Cast your skin before you buy — YouCam **Skin Analysis** + **Skin Simulation** inside a shopping concierge for the [YouCam API Skin AI & eCommerce VTO Hackathon](https://youcam-api-skin-ai-ecommerce.devpost.com/).

**Status:** Concept **LOCKED** by Lead (2026-09-29). Vertical slice + UX polish on `feat/skincast-mvp`.

## Problem

Online skincare shoppers can’t map product claims (“shrink pores,” “fade spots”) to *their* face. Quizzes and chatbots give advice without visual proof — so carts are guesses, returns pile up, and barriers get wrecked by the wrong actives.

## Solution

**SkinCast** walks a shopper through:

1. Guided selfie upload  
2. **YouCam Skin Analysis** — multi-concern scores + skin-type signal  
3. Claim→concern product matching from a curated catalog  
4. **YouCam Skin Simulation** — before/after on the shopper’s face  
5. Add to cart (mock checkout for MVP)

## Why YouCam is essential

An LLM can invent skincare advice; it cannot produce dermatologist-oriented multi-concern scores or realistic on-face skin simulations. Remove YouCam and SkinCast collapses into generic chat. The judge path is: selfie → analysis → matched products → simulation → cart.

## Live demo

**https://youcam-ai-commerce.vercel.app** — production deploy from `feat/skincast-mvp` (runs in **mock** until a human adds `YOUCAM_API_KEY` in Vercel).

## Local run

```bash
cp .env.example .env.local
# Optional for live APIs (never commit):
# YOUCAM_API_KEY=your_key_here
# YOUCAM_API_BASE_URL=https://yce-api-01.makeupar.com

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Mode | Condition | Behavior |
|------|-----------|----------|
| **Mock** | No `YOUCAM_API_KEY` | Full UI with deterministic scores + SVG “after” |
| **Live** | Key set in `.env.local` / Vercel | Real File + Skin Analysis v2.1 + Skin Simulation |

### Add YouCam key on Vercel (human)

1. Vercel → team **SOGIS** → project **youcam-ai-commerce** → **Settings → Environment Variables**
2. Add sensitive `YOUCAM_API_KEY` for Production + Preview (never `NEXT_PUBLIC_`)
3. Redeploy, then confirm `/api/health` shows `"youcamLive": true`

Details: `docs/SECURITY.md`

## Demo

- Script (1–3 min): [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md)
- UX spec: [`docs/UX_SPEC.md`](docs/UX_SPEC.md)
- Screenshots for submission live in the project media store (`media/skincast/`) — captured from the running app, not mockups.

## Docs

- `docs/PRODUCT_DECISION.md` — locked SkinCast  
- `docs/ARCHITECTURE.md`  
- `docs/API_INTEGRATION.md`  
- `docs/SECURITY.md` — secrets policy  
- `docs/agent-state/MASTER_STATE.md`  
- `docs/agent-state/design-qa.md`

## Stack

Next.js App Router · TypeScript · Tailwind · Vercel-ready · server-only YouCam Bearer
