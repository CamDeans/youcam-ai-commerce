# PRODUCT_DECISION — SkinCast

**Status:** LOCKED by Lead (2026-09-29)  
**Track:** Skin AI (primary), with ecommerce purchase workflow  
**Date:** 2026-09-29  
**Author:** Agent 2 (Product + Research); locked by Lead over MirrorLane / ReturnShield

---

## One-liner

**SkinCast** — See how a skincare product would change *your* skin before you buy, using YouCam Skin Analysis + Skin Simulation inside an agentic shopping concierge.

## Why YouCam is necessary

An LLM can invent skincare advice; it cannot produce **dermatologist-oriented multi-concern scores, concern heatmaps, or realistic before/after skin simulations** on the shopper’s own face. Without YouCam Skin Analysis + Skin Simulation, SkinCast collapses into generic chat recommendations. Judges should see: selfie → concern map/scores → simulated improvement for a matched product → cart. That visual trust loop is the product.

---

## Problem

Online skincare shoppers face:

1. **Uncertainty** — product claims (“reduces pores,” “fades dark spots”) are hard to map to *their* face.
2. **Waste & returns** — wrong actives for skin type; money and skin barrier damage.
3. **Fragmented advice** — quizzes and chatbots lack visual proof.

Moment of pain (matches Devpost Skin AI framing): right before purchase, after a breakout, or when deciding if a product is working.

## User

- **Primary:** Beauty-conscious online shoppers (18–40) buying serums/moisturizers without in-store consultation.
- **Secondary (retail):** DTC skincare brands and retailers wanting conversion + fewer returns.
- **Demo persona:** “Alex, combination skin, shopping for a niacinamide serum before a big event.”

## Solution

Web app (mobile-first) that:

1. Captures a guided selfie (Camera Kit `skincare` / upload).
2. Runs **YouCam Skin Analysis v2.1** (HD concerns: acne, pores, texture, oiliness, moisture, dark circles, wrinkles, skin type, etc.).
3. Agent interprets scores + user goals/budget/climate → ranked regimen and SKUs from a curated catalog.
4. For the top pick(s), runs **YouCam Skin Simulation** with intensities mapped from product claims → concern deltas.
5. Shows side-by-side current vs projected skin + “why this product” evidence.
6. One-tap add-to-cart / checkout handoff (mock Shopify or static catalog for MVP).
7. Optional: save baseline for a later re-scan (“is it working?”) — roadmap.

## End-to-end workflow (demo script ~90s)

1. Land → “Cast your skin before you buy.”
2. Consent + selfie capture.
3. Loading → concern cards + overlay images (analysis).
4. Agent chat: “Top concerns: pores (cheek) + oiliness (T-zone). Goal?”
5. Pick product → simulate → before/after slider.
6. Add to cart → confirmation.

## YouCam usage (MVP)

| Step | API | Why |
| --- | --- | --- |
| Analyze | `POST/GET /s2s/v2.1/task/skin-analysis` (`format=json`, HD actions) | Quantitative + visual evidence |
| Simulate | `POST/GET /s2s/v2.0/task/skin-simulation` | Product “try-on” for skin outcomes |
| Capture (optional) | JS Camera Kit `skincare` | Better input quality / demo polish |

Auth: server-held Bearer API key; client never sees key.  
Units: plan ~1–3 analysis + 1–2 simulations per demo path; stay well under 1,000 free units.

## Differentiator

| Competitor pattern | SkinCast |
| --- | --- |
| Skin quiz → product list | Visual analysis + **simulated outcome on your face** |
| Generic chat skincare bot | YouCam scores as hard evidence the agent must cite |
| Standalone VTO makeup demos | Purchase-moment **proof**, not entertainment filter |

Not a thin API wrapper: product-claim→concern mapping, agent policy, and commerce UX are the value layer; YouCam is the irreplaceable sensor/renderer.

## Business model (sketch)

- **B2C:** freemium scans; paid deeper regimens / progress tracking.
- **B2B SaaS:** embed SkinCast widget for DTC brands (per-scan units + SaaS fee); affiliate / referral on matched SKUs.
- Hackathon story: “reduce returns + increase AOV with confidence.”

## Architecture sketch

```
[Browser] --selfie--> [Next.js/API routes]
                          |-- upload/file or public URL
                          |-- YouCam Skin Analysis
                          |-- YouCam Skin Simulation
                          |-- Agent (LLM) cites scores only
                          |-- Catalog matcher (local JSON / Shopify Storefront)
[Browser] <-- scores, overlays, sim image, cart URL
```

- Secrets: `YOUCAM_API_KEY` (and LLM key if used) in env / Vercel.
- No secrets in git.
- Prefer poll-with-progress UI; webhook later if needed.

See `docs/ARCHITECTURE.md` and `docs/API_INTEGRATION.md` for the locked engineering design.

## MVP scope (hackathon)

**In**

- Guided capture/upload
- Skin Analysis (subset of HD concerns for speed/units)
- Curated 8–15 SKU catalog with claim→concern tags
- Agent explanation grounded in scores
- One Skin Simulation per top recommendation
- Before/after UI + mock checkout
- Public repo, README, deploy URL, 1–3 min demo video plan

**Out (post-MVP / roadmap)**

- Full multi-week progress journal with reminders
- Live retailer inventory / real payments
- Makeup Look VTO combo (**MirrorLane** stretch)
- Native iOS/Android
- Clinical claims / medical advice (explicit non-medical disclaimer always)

## Roadmap

1. **MVP** — analysis → match → simulate → cart (above).
2. **v1.1** — re-scan comparison; shareable “skin cast” card; social bonus video.
3. **v1.2** — Shopify app / embed; brand dashboard (aggregate concern trends).
4. **Stretch dual-track** — add Clothes/Makeup VTO for “event-ready skin + look” (MirrorLane).

## Risks

| Risk | Mitigation |
| --- | --- |
| No API key / units yet | Human: Devpost register → YouCam signup → redeem 1,000 units |
| Analysis/sim fail on bad selfies | Camera Kit guidance + sample fallback images for judges |
| Unit burn in testing | Cache results; SD vs HD choice; limit concerns in MVP |
| “Medical advice” perception | Clear wellness/retail disclaimer; no diagnosis language |
| Agentic fluff without YouCam | Gate agent: must display API-derived scores/images |

## Alternatives considered

See [`research/concept-scorecard.md`](research/concept-scorecard.md). Closest runner-ups: **MirrorLane** (skin+fashion), **ReturnShield** (clothes VTO returns). **Lead locked SkinCast** (2026-09-29) over those alternatives.

## Decision needed from Lead / human

1. ~~Confirm **SkinCast** as locked concept~~ — **DONE (Lead 2026-09-29).**
2. Create YouCam + Devpost accounts; provide API key via secure env (not chat/git).
3. ~~Confirm stack preference~~ — **Next.js App Router + Vercel** (Lead / Engineering).
