# Agent State — Engineering

**Agent:** Deploy readiness + harden (`bc-f01e4438`) atop smoke harden  
**Last updated:** 2026-09-29  
**Branch:** `feat/skincast-mvp` · PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3)  
**Status:** P0/P1 can-fix-now landed locally; waiting promote/verify on production; **blocked** on human YouCam key for live

---

## Snapshot

| Item | Value |
|------|--------|
| Concept | **SkinCast** (Lead lock) |
| Milestone | DEMO PREP / deploy harden (pre-credentials) |
| Stack | Next.js App Router + TypeScript + Tailwind on Vercel |
| Production URL | **https://youcam-ai-commerce.vercel.app** |
| Production SHA (last verified) | `a20856d` — promote pending for this harden |
| Vercel | Team SOGIS · project `youcam-ai-commerce` |
| YouCam | Server-only Bearer; Analysis v2.1 + Simulation v2.0 |
| Deploy mode now | **mock** (`youcamLive: false`) |
| Test plan | `docs/TEST_PLAN.md` |
| Deploy readiness | store `docs/deploy-readiness.md` |

---

## This pass (deploy readiness)

- Gap matrix (Met/Gap/P0–P2/owner/evidence) — **not** claiming ready
- CI workflow: lint · typecheck · vitest · build · `npm audit --audit-level=high`
- Vitest coverage: match, mock, parseAnalysisConcerns, env, rateLimit
- Security headers + pragmatic CSP (`next.config.ts`)
- YouCam fetch timeouts + transient retries (no credit/auth retry-burn)
- In-memory rate limits on analyze/simulate; structured request logs
- `error.tsx` / `global-error.tsx`; robots + sitemap; OG/Twitter metadata
- Client offline banner + fetch timeouts; stop echoing base64 preview from analyze
- Health: version / commit / vercelEnv (non-secret)

**Partner (`bc-7aa549a9`):** pull this branch, redeploy, verify headers/robots/health on prod. Avoid parallel edits to files above until pull.

---

## Blockers

- [ ] Promote + verify harden on production
- [ ] Human: Devpost Join + YouCam signup + redeem units
- [ ] Human: add `YOUCAM_API_KEY` in Vercel (never git) → redeploy → live smoke
- [ ] Human: make repo public **or** share with `contact_event@PerfectCorp.com`
- [ ] Demo video + live screenshots
- [ ] Devpost submission text/assets

---

## Sync log

| Date | Change |
|------|--------|
| 2026-09-29 | Initial empty-repo audit → MVP → production mock |
| 2026-09-29 | Smoke harden: validation, disclaimer, mock cart, LICENSE, TEST_PLAN |
| 2026-09-29 | Deploy-readiness P0/P1 can-fix-now on PR #3 |
