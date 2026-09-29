# Agent State — Engineering

**Agents:** Deploy readiness (`bc-f01e4438`) + prod-harden complement (`bc-7aa549a9`)  
**Last updated:** 2026-09-29  
**Branch:** `feat/skincast-mvp` · PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3)  
**Status:** Pre-credential harden **promoted/verified** on prod (mock @ `cbd80bf`); **blocked** on human YouCam key for live

---

## Snapshot

| Item | Value |
|------|--------|
| Concept | **SkinCast** (Lead lock) |
| Milestone | DEMO PREP / **prod harden** (pre-credentials) |
| Stack | Next.js App Router + TypeScript + Tailwind on Vercel |
| Production URL | **https://youcam-ai-commerce.vercel.app** |
| Production SHA | `cbd80bf` (`dpl_FdZRGKop5z3CW28hUzd8xy19zzux`) |
| Vercel | Team SOGIS · project `youcam-ai-commerce` |
| YouCam | Timeouts + retries; structured public errors (no secret leak); Analysis v2.1 + Simulation v2.0 |
| Deploy mode now | **mock** (`youcamLive: false`, `commit: cbd80bf`) |
| Test plan | `docs/TEST_PLAN.md` |
| Deploy readiness | store `docs/deploy-readiness.md` |
| CI | `.github/workflows/ci.yml` (+ Playwright smoke job) |

---

## Combined harden

**Deploy-readiness (`11049be`):** CI, vitest baseline, CSP/headers, YouCam timeouts/retries, rate limits, structured logs, error boundaries, robots/sitemap/OG, offline + client timeouts, no base64 echo.

**Complement (`cbd80bf`):**
- Playwright critical-path smoke + CI e2e job
- API route vitest (health/analyze/simulate mock + validation)
- `api-error` redaction (Bearer/URL query strip)
- Env: `YOUCAM_MODE=live` without key → clear fail; otherwise graceful mock; boot `instrumentation.ts`
- Image remotePatterns / formats; validation `code` on APIs; retryable UX hints
- `npm audit` → 0 vulns

---

## Deploy verification (2026-09-29 prod harden `cbd80bf`)

| Check | Result |
|-------|--------|
| `GET /` | 200; CSP + XFO + nosniff + Referrer + Permissions-Policy |
| `GET /api/health` | `{ ok, youcamLive:false, mode:mock, version:0.1.0, commit:cbd80bf, vercelEnv:production }` + `Cache-Control: no-store` |
| `GET /robots.txt` | 200; Disallow `/api/`; Sitemap present |
| `POST /api/analyze` mock | mode=mock, 8 concerns, 4 products, no `previewDataUrl` |
| `POST /api/analyze` text/plain | 400 `code:VALIDATION` |
| `POST /api/simulate` mock | mode=mock SVG after-cast |
| Live YouCam | Not run (no key) |

---

## Blockers

- [x] Promote + verify harden on production (`cbd80bf`)
- [ ] Human: Devpost Join + YouCam signup + redeem units
- [ ] Human: add `YOUCAM_API_KEY` in Vercel (never git) → redeploy → live smoke
- [ ] Human: make repo public **or** share with `contact_event@PerfectCorp.com`
- [ ] Demo video + live screenshots
- [ ] Devpost submission text/assets

---

## Sync log

| Date | Change |
|------|--------|
| 2026-09-29 | MVP → production mock → smoke harden |
| 2026-09-29 | Deploy-readiness P0/P1 + promote `11049be` verified on production |
| 2026-09-29 | Complement: Playwright, API route tests, secret-safe errors, env live-fail |
