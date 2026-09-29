# SkinCast — Demo Script (1–3 min)

**Audience:** Hackathon judges (Devpost / YouCam)  
**Mode:** Prefer live YouCam; mock mode is acceptable if key unavailable — say so once.  
**Length target:** ~90–120 seconds (hard cap 3 min)

---

## Cold open (0:00–0:15) — Problem

> Online skincare is a guess. Claims say “shrink pores” or “fade spots,” but you can’t see how a product might change *your* face before you buy. Quizzes and chatbots don’t give visual proof — so people waste money and damage their barrier.

Show: SkinCast landing (full-bleed hero, brand dominant).

---

## Product (0:15–0:35) — What SkinCast is

> **SkinCast** is a shopping concierge: selfie → YouCam Skin Analysis → matched products → YouCam Skin Simulation before/after → cart.  
> We’re not another advice chatbot. Without YouCam concern scores and on-face simulation, this product doesn’t exist.

CTA: tap **Start skin cast**.

---

## YouCam path (0:35–1:20) — Proof it isn’t a wrapper

1. **Upload selfie** (good light, face fills frame).  
2. **Analyze with YouCam** — call out loading: *Casting skin / Running YouCam skin analysis*.  
3. On **Concern cast**: point to top scores (pores, oiliness, texture, etc.) and skin-type signal.  
4. Open a **matched product** — explain claim→concern mapping (“why this product”).  
5. **Simulate** — drag the before/after slider. Say: *This after image is Skin Simulation driven by product intensities — not a filter sticker.*

If demo mode: one line — *Running deterministic mock until `YOUCAM_API_KEY` is set; same UI path as live.*

---

## Commerce close (1:20–1:45)

> Proof → purchase moment: **Add to cart**. Mock checkout for MVP — the product for judges is the analysis → simulation → cart loop.

Show success banner / cart summary. Mention wellness disclaimer briefly if time.

---

## Optional 30s buffer (if under 2 min)

- Toggle another product simulation.  
- Show header **Live YouCam** vs **Demo mode**.  
- One sentence on roadmap: re-scan later to check if it’s working (not built in MVP).

---

## Shot list (for recording)

| Shot | Screen | Note |
|------|--------|------|
| 1 | Landing | Brand + headline only |
| 2 | Upload | Selfie select + analyze |
| 3 | Analysis | Scores + matches |
| 4 | Simulation | Slider before/after |
| 5 | Cart | Add success |

Still references (project store): `media/skincast/` — landing, upload, analysis, simulation, cart (+ mobile if available).

---

## Do / don’t

**Do:** Name Skin Analysis + Skin Simulation explicitly.  
**Do:** Keep YouCam as the irreplaceable step.  
**Don’t:** Claim medical diagnosis or live production URL unless verified.  
**Don’t:** Show `.env` contents or API keys on camera.
