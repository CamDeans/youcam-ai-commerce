# SkinCast UX Specification

**Product:** SkinCast  
**Audience:** Hackathon judges + beauty shoppers (demo)  
**Last updated:** 2026-09-29  
**Owner:** Design / QA (Agent 4)

---

## 1. Product identity

**Brand:** SkinCast  
**Promise:** Cast your skin before you buy.  
**Personality:** Calm retail wellness — confident, evidence-led, never clinical-diagnosis.  
**Not:** Purple “AI dashboard,” neon VTO toy, or cluttered beauty marketplace.

YouCam is the sensor/renderer (concern scores + on-face simulation). SkinCast is the shopping concierge that turns those signals into matched products and a cart decision.

### Brand test

Removing the nav, the first viewport must still read as **SkinCast** (large display wordmark + one promise line). If it could belong to another beauty AI brand, branding is too weak.

---

## 2. Typography

| Role | Face | Usage |
|------|------|--------|
| Display | **Fraunces** (`--font-fraunces`) | Brand wordmark, section titles |
| Body / UI | **Figtree** (`--font-figtree`) | Copy, labels, buttons, scores |

**Scale (approx.)**

- Brand hero: 3–5rem (mobile) → 5–8rem (desktop)
- Section H2: ~2rem–2.25rem
- Body: 0.95–1.05rem
- Meta / labels: 0.7–0.8rem uppercase tracking for brand/mode chips only — sparingly

Avoid Inter / Roboto / system as the primary voice.

---

## 3. Color

CSS variables live in `src/app/globals.css`.

| Token | Hex (approx.) | Role |
|-------|----------------|------|
| `--deep` | `#1e3a31` | Primary brand / CTAs / text on light |
| `--ink` | `#14241f` | Body text |
| `--ink-soft` | `#3a534a` | Secondary copy |
| `--foam` | `#f2f7f4` | Light surfaces / text on deep |
| `--sage` | `#5f8f7a` | Progress, score bars, success tint |
| `--mist` | `#cfe0d7` | Borders / soft dividers |
| `--sand` | `#e4eee8` | Track fills, idle chips |
| `--coral` | `#b24f3d` | Commerce CTA (add to cart) only |

**Direction:** Cool forest spa — not cream+terracotta editorial, not purple gradient AI.

Background atmosphere: soft sage radial washes over foam; hero uses a full-bleed photographic plane with a deep green scrim.

---

## 4. Layout & composition

### Landing (first viewport)

One composition, full-bleed hero plane:

1. **SkinCast** (display brand)
2. One headline: *Cast your skin before you buy.*
3. One supporting sentence (YouCam → match → simulate)
4. One CTA group: **Start skin cast** + disclaimer link
5. Dominant atmosphere image (edge-to-edge)

No stats strips, no product cards, no floating badges on the hero media.

### Workflow steps

After leave-landing: compact step rail — Selfie → Analysis → Simulate → Cart.

Product tiles on the analysis step are **interaction containers** (tap to simulate), not decorative cards for decoration’s sake.

---

## 5. Motion (intentional, 2–3 primary)

Respect `prefers-reduced-motion`.

1. **Rise-in** — hero copy and step sections enter with short vertical fade.
2. **Bar fill** — concern scores animate width once on results.
3. **Loading sheen + spinner** — modal casting overlay during analyze/simulate.

Secondary: soft breath on empty upload affordance; before/after slider is user-driven, not auto-animated.

---

## 6. UI states

| State | Behavior |
|-------|----------|
| **Loading** | Full-viewport dim + modal: “Casting skin” + contextual label (analysis / simulate product). |
| **Empty cart** | Centered message + CTA back to matches or upload. |
| **Empty products** | Inline empty panel on results if matcher returns none. |
| **Error** | Coral-tint alert with dismiss; keep user on current step. |
| **Success** | Cart success banner: “Added to cart — you’re cast-ready.” |
| **Demo vs live** | Header mode chip: `Demo mode` / `Live YouCam`; demo banner explains env key (no secrets shown). |

---

## 7. Mobile

- Mobile-first; max content width ~72rem.
- Hero min-height ~88vh capped; copy stacks above bottom of plane.
- Step rail horizontally scrollable, no scrollbar chrome.
- Before/after: taller aspect on small screens (`4/5`), wider on `sm+`.
- Touch targets ≥ ~44px for primary buttons.
- Mode chip + cart stay in header; avoid sticky clutter.

---

## 8. Accessibility & trust

- Wellness disclaimer in footer (not medical advice).
- `role="alert"` on errors; `role="status"` on loading/success.
- Range input labeled for before/after.
- Never expose API keys in UI; demo banner names env var only.

---

## 9. Out of scope (MVP)

- Real checkout / payments
- Camera Kit capture polish
- Dark mode
- Multi-language

---

## Related

- Demo script: `docs/DEMO_SCRIPT.md`
- Design QA log: `docs/agent-state/design-qa.md`
- Screenshots: project store `media/skincast/` (see README)
