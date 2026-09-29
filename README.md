# SkinCast

Cast your skin before you buy — YouCam **Skin Analysis** + **Skin Simulation** inside a shopping concierge for the [YouCam API Skin AI & eCommerce VTO Hackathon](https://youcam-api-skin-ai-ecommerce.devpost.com/).

**Status:** Concept **LOCKED** by Lead (2026-09-29). Vertical slice on `feat/skincast-mvp`.

## Why YouCam is essential

Without YouCam concern scores and on-face skin simulation, this is generic advice chat. The demo path is: selfie → analysis → matched products → before/after simulation → cart.

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

## Docs

- `docs/PRODUCT_DECISION.md` — locked SkinCast
- `docs/ARCHITECTURE.md`
- `docs/API_INTEGRATION.md`
- `docs/SECURITY.md` — secrets policy
- `docs/agent-state/MASTER_STATE.md`

## Stack

Next.js App Router · TypeScript · Tailwind · Vercel-ready · server-only YouCam Bearer
