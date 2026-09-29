# SkinCast — Test Plan & Smoke Results

**Owner:** Engineering + QA  
**Last run:** 2026-09-29 (prod harden complement)  
**Branch:** `feat/skincast-mvp` → PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3)  
**Environments:** local `http://localhost:3000` · production `https://youcam-ai-commerce.vercel.app`  
**Mode:** mock (`YOUCAM_API_KEY` unset) unless noted

> Do not claim submission-ready. Live YouCam path is blocked on human credentials.

---

## Automated suite

| Suite | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass |
| Typecheck | `npm run typecheck` | Pass |
| Unit + API routes (vitest) | `npm run test` | **21 passed** |
| Production build | `npm run build` | Pass |
| Playwright smoke | `npm run test:e2e` | **2 passed** |
| `npm audit` | `npm audit` / CI `--audit-level=high` | **0 vulnerabilities** |
| CI | `.github/workflows/ci.yml` | lint · typecheck · test · build · audit · Playwright |

Coverage includes: matcher/mock/parser, env (`YOUCAM_MODE=live` fail), rate limit, API error redaction, `/api/health` · `/api/analyze` · `/api/simulate` mock + validation, Playwright landing→cart.

---

## Environments

| Env | Health | Notes |
| --- | --- | --- |
| Local mock | `mode:mock`, `youcamLive:false` | Verified |
| Production | Verify after promote of this harden | Expect headers + robots + mock health |
| Live YouCam | — | **Blocked** on human key |

---

## Smoke matrix (mock)

Prior smoke harden matrix (1–27) remains Pass on local; Playwright re-confirms critical path. Post-promote: re-check health, CSP/XFO/nosniff, `/robots.txt`, analyze validation on prod.

---

## API checks (mock)

```bash
curl -sSI https://youcam-ai-commerce.vercel.app/ | grep -iE 'content-security-policy|x-frame-options|x-content-type'
curl -sS https://youcam-ai-commerce.vercel.app/api/health
curl -sS -X POST -F "image=@public/demo-selfie.jpg;type=image/jpeg" \
  https://youcam-ai-commerce.vercel.app/api/analyze
# → analysis.mode=mock, products ≥1, no previewDataUrl echo
```

---

## Open items

| Item | Status |
| --- | --- |
| Live YouCam analyze + simulate | Blocked on human `YOUCAM_API_KEY` |
| Live screenshots / device video | Blocked |
| Judge video / Devpost / repo visibility | Human gate |

---

## Sign-off

| Role | Result | Date |
| --- | --- | --- |
| Engineering (sibling harden + complement) | CI/tests/headers/timeouts/redaction; Playwright smoke | 2026-09-29 |
| Live YouCam | Not run | — |
| Submission-ready | **No** | — |
