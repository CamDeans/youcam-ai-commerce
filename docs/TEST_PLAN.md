# SkinCast — Test Plan & Smoke Results

**Owner:** Engineering + QA  
**Last run:** 2026-09-29  
**Branch:** `cursor/smoke-harden-6640` → PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3)  
**Environments:** local `http://localhost:3000` · production `https://youcam-ai-commerce.vercel.app`  
**Mode:** mock (`YOUCAM_API_KEY` unset) unless noted

> Do not claim submission-ready. Live YouCam path is blocked on human credentials.

---

## Environments

| Env | Health | Notes |
| --- | --- | --- |
| Local mock | `{"ok":true,"youcamLive":false,"mode":"mock"}` | Verified this pass |
| Production mock | `{"ok":true,"youcamLive":false,"mode":"mock"}` | Verified post-redeploy `a20856d` / `dpl_BaMQeULiFhymXsikJi74NS8A7Lfe` |
| Live YouCam | — | **Blocked** — human must add key + redeploy |

---

## Smoke matrix

| # | Surface | Local | Prod | Evidence / notes |
| --- | --- | --- | --- | --- |
| 1 | Landing brand hero + CTA | Pass | Pass | SkinCast display + Start skin cast |
| 2 | Wellness disclaimer link → footer | Pass | Pass | `#disclaimer` |
| 3 | Demo / Live mode chip | Pass | Pass | Demo mode when no key |
| 4 | Demo mode banner (non-land) | Pass | Pass* | *After this harden deploy |
| 5 | Nav brand → land | Pass | Pass | Header SkinCast button |
| 6 | Upload step copy + dropzone | Pass | Pass | |
| 7 | File accept jpg/png/webp | Pass | Pass | Input `accept` |
| 8 | Reject non-image (API) | Pass | Pass* | 400 unsupported type |
| 9 | Reject oversized image (API) | Pass | Pass* | 400 >8 MB |
| 10 | Analyze → loading overlay | Pass | Pass | Casting skin |
| 11 | Concern scores + matches | Pass | Pass | 4 products mock |
| 12 | Wellness line near scores | Pass | Pass* | Not medical advice |
| 13 | Empty products state | Pass | N/A | UI present; mock returns matches |
| 14 | Product → simulate | Pass | Pass | Before/after slider |
| 15 | Simulation wellness note | Pass | Pass* | Illustrative / not clinical |
| 16 | Add to mock cart | Pass | Pass | Success status |
| 17 | Mock cart labeled (no payments) | Pass | Pass* | Title + copy |
| 18 | Remove from cart | Pass | Pass* | |
| 19 | Empty cart CTA | Pass | Pass | |
| 20 | Error dismiss | Pass | Pass | |
| 21 | Keyboard focus-visible | Pass | Pass* | Global `:focus-visible` |
| 22 | Desktop viewport ~1280 | Pass | Pass | Screenshots |
| 23 | Mobile viewport ~390 | Pass | Pass | `06-mobile-landing` + QA |
| 24 | Reduced-motion CSS | Pass | Pass | `prefers-reduced-motion` |
| 25 | 404 page | Pass | Pass* | Custom not-found |
| 26 | `/api/health` | Pass | Pass | mock |
| 27 | Hover CTAs | Pass | Pass | Visual |

\* = hardened this pass; confirm on production after redeploy.

---

## API checks (mock)

```bash
curl -sS https://youcam-ai-commerce.vercel.app/api/health
# → ok, youcamLive:false, mode:mock

curl -sS -X POST -F "image=@public/demo-selfie.jpg;type=image/jpeg" \
  https://youcam-ai-commerce.vercel.app/api/analyze
# → analysis.mode=mock, products length 4

curl -sS -X POST -F "image=@/tmp/bad.txt;type=text/plain" \
  http://localhost:3000/api/analyze
# → 400 Unsupported file type
```

---

## Browser E2E (computer-use)

Agent [Browser smoke SkinCast](bc-dd80e755-3a18-5fa4-8db4-fa62d64efd39) · report `internal/skincast-browser-qa-report.md` (project store).

| Scope | Result |
| --- | --- |
| Prod + local happy path (28 items) | Pass |
| Mobile landing/upload | Pass |
| Focus-visible on header controls | Pass |
| Noted “Cart” heading / default 404 on prod | Stale vs pre-promote; post-promote has **Mock cart** + custom 404 |

## Failure / QA media

New captures under:

- `/cursor/stores/self/media/skincast/qa/` (`qa-01` … `qa-15`)
- Prior happy-path: `/cursor/stores/self/media/skincast/01–06-*.png`

---

## Open smoke items

| Item | Status |
| --- | --- |
| Live YouCam analyze + simulate | Blocked on human `YOUCAM_API_KEY` |
| Live screenshots / device video | Blocked |
| iOS Safari deep a11y | Deferred |
| Judge video recording | Blocked (human/device) |

---

## Sign-off

| Role | Result | Date |
| --- | --- | --- |
| Engineering + QA (mock path) | Mock E2E smoke + harden fixes | 2026-09-29 |
| Live YouCam | Not run | — |
| Submission-ready | **No** | — |
