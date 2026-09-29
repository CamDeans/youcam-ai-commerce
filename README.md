# SkinCast

Cast your skin before you buy — YouCam **Skin Analysis** + **Skin Simulation** inside a shopping concierge for the [YouCam API Skin AI & eCommerce VTO Hackathon](https://youcam-api-skin-ai-ecommerce.devpost.com/).

**Status:** Concept **LOCKED** by Lead (2026-09-29). Vertical slice + UX polish + smoke harden on PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3).  
**Not submission-ready** — live YouCam, Devpost package, and judge repo access still open (see `docs/HACKATHON_COMPLIANCE.md`).

## Problem

Online skincare shoppers can’t map product claims (“shrink pores,” “fade spots”) to *their* face. Quizzes and chatbots give advice without visual proof — so carts are guesses, returns pile up, and barriers get wrecked by the wrong actives.

## Solution

**SkinCast** walks a shopper through:

1. Guided selfie upload  
2. **YouCam Skin Analysis** — multi-concern scores + skin-type signal  
3. Claim→concern product matching from a curated catalog  
4. **YouCam Skin Simulation** — before/after on the shopper’s face  
5. **Mock cart** (hackathon MVP — no real payments)

Scores and simulations are **retail wellness signals, not medical advice or diagnosis.**

## Why YouCam is essential

An LLM can invent skincare advice; it cannot produce dermatologist-oriented multi-concern scores or realistic on-face skin simulations. Remove YouCam and SkinCast collapses into generic chat. The judge path is: selfie → analysis → matched products → simulation → cart.

## Live demo

**https://youcam-ai-commerce.vercel.app** — production from the SkinCast MVP branch.

| Mode | When | What judges see |
|------|------|-----------------|
| **Demo mode** | No `YOUCAM_API_KEY` (current production until human adds key) | Full UI path with deterministic mock scores + illustrative after-cast |
| **Live YouCam** | Key set in Vercel / `.env.local` | Real File + Skin Analysis v2.1 + Skin Simulation |

Header chip shows **Demo mode** or **Live YouCam**. Check `/api/health` → `youcamLive` / `mode`.

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

### Add YouCam key on Vercel (human only)

1. Vercel → team **SOGIS** → project **youcam-ai-commerce** → **Settings → Environment Variables**
2. Add sensitive `YOUCAM_API_KEY` for Production + Preview (never `NEXT_PUBLIC_`)
3. Redeploy, then confirm `/api/health` shows `"youcamLive": true`

Details: `docs/SECURITY.md`

## License & judge repo access (human)

- Source is licensed **MIT** (`LICENSE`).
- GitHub repo may still be **private**. Before submit, a human must either:
  - make the repo **public**, **or**
  - share private access with `contact_event@PerfectCorp.com` (Rules §4).
- Agents do not change GitHub visibility.

## Demo

- Script (1–3 min): [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md)
- Smoke / test plan: [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md)
- UX spec: [`docs/UX_SPEC.md`](docs/UX_SPEC.md)
- Screenshots: project store `media/skincast/` (mock path; re-shoot after live key)

## Docs

- `docs/PRODUCT_DECISION.md` — locked SkinCast  
- `docs/ARCHITECTURE.md`  
- `docs/API_INTEGRATION.md`  
- `docs/SECURITY.md` — secrets policy  
- `docs/HACKATHON_COMPLIANCE.md` — rules matrix  
- `docs/RELEASE_CHECKLIST.md`  
- `docs/agent-state/MASTER_STATE.md`

## Stack

Next.js App Router · TypeScript · Tailwind · Vercel-ready · server-only YouCam Bearer
