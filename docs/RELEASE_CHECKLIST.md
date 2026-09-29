# Release Checklist

Derived from the YouCam Hackathon Operating System. Mark **only after verification** — never claim done/deployed/tested without evidence.  
**Not submission-ready** until live YouCam + Devpost package + human gates close.  
**Pre-credential deploy readiness:** store `docs/deploy-readiness.md` — engineering harden landed on PR #3; production redeploy verify may lag.

**References:** Devpost · [Rules](https://youcam-api-skin-ai-ecommerce.devpost.com/rules) · `docs/SECURITY.md` · `docs/HACKATHON_COMPLIANCE.md` · `docs/TEST_PLAN.md`

---

## 0. Operating constraints (continuous)

- [x] YouCam necessity is obvious to a judge (README + UI path + demo script)
- [x] No secrets in git history (spot-check; `.env.example` placeholders only)
- [x] Docs under `/docs/agent-state/` stay synchronized (deploy-readiness harden)
- [x] Never claim done / deployed / tested without verification
- [x] Max 4 agents; ownership boundaries respected (coordination lock in MASTER_STATE)
- [x] Human-only gates not bypassed (MFA, payments, legal, final submission, API key)

---

## 1. Discover

- [x] Official Devpost page and rules reviewed (latest — compliance audit 2026-09-29)
- [x] YouCam API capabilities relevant to the concept documented
- [x] Constraints / disallowed approaches noted for Lead

---

## 2. Ideate & lock

- [x] ≥10 concepts scored
- [x] Single concept locked in `docs/PRODUCT_DECISION.md`
- [x] YouCam-essential rationale written for judges

---

## 3. Architect & compliance

- [x] `docs/ARCHITECTURE.md` TBD sections filled for locked product
- [x] Compliance / rules alignment reviewed before significant build
- [x] `docs/SECURITY.md` env list matches planned integrations
- [x] Privacy / image retention approach agreed (no DB persist; portal 24h)

---

## 4. Build (vertical slices)

- [ ] Slice 0 spike: YouCam reachable with env-only credentials (**blocked on human key**)
- [x] Slice 1 MVP: YouCam → visible result → commerce action (E2E **mock** path verified)
- [x] Error states and empty states demo-safe (+ React `error.tsx` / `global-error.tsx`)
- [x] No secrets in client bundles or repo
- [x] Mock cart clearly labeled (no live-payment claims)
- [x] Wellness disclaimer on scores + footer
- [x] Demo vs Live mode chip + banner
- [x] MIT `LICENSE` added (repo visibility / PerfectCorp share still **human**)
- [x] CI: lint · typecheck · test · build · `npm audit --audit-level=high`
- [x] YouCam client timeouts + safe retries; API rate limits; structured request logs
- [x] Security headers + pragmatic CSP (`next.config.ts`)
- [x] robots.txt + sitemap + OG/Twitter metadata

---

## 5. Deploy & verify

- [x] Production URL live: https://youcam-ai-commerce.vercel.app
- [ ] Production YouCam path verified with a real demo run (**blocked on key**)
- [x] Commerce action verified on deployed environment (**mock cart**)
- [x] Smoke checklist recorded — `docs/TEST_PLAN.md`
- [x] Production redeploy of deploy-readiness harden verified — `11049be` / `dpl_5V9PnFG6pJcQbppedw4fsSnREAzw` (headers /robots /health)

---

## 6. Polish & demo

- [x] README: what it is, why YouCam is essential, how to run, demo URL, license/repo note
- [x] Screenshots captured (mock path; project store `media/skincast/`)
- [x] Demo script written (`docs/DEMO_SCRIPT.md`)
- [ ] Demo script rehearsed on **live** path
- [ ] 1–3 min public YouTube/Vimeo video

---

## 7. Final audit & submission

- [x] Compliance re-audit vs latest Devpost rules (`docs/HACKATHON_COMPLIANCE.md`)
- [x] Deploy-readiness gap matrix (store `docs/deploy-readiness.md`) — **not** claiming ready
- [ ] Release checklist fully reviewed with Lead + human
- [ ] Human: public repo **or** share with contact_event@PerfectCorp.com
- [ ] Human completes final Devpost submission
- [ ] Post-submit: agent-state updated with final URLs and commit SHA

---

## Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Engineering + QA | smoke-harden | 2026-09-29 | Mock path only; not submission-ready |
| Lead / deploy readiness | bc-f01e4438 | 2026-09-29 | P0/P1 can-fix-now landed on PR #3; prod verify pending; **not** submission-ready |
| Human (submission) | | | |
