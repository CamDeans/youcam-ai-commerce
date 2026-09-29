# MASTER_STATE

Lead-owned project state. Updated 2026-09-29 after SkinCast lock + Engineering MVP slice + Design/QA polish.

## Snapshot

| Field | Value |
| --- | --- |
| Milestone | **IMPLEMENT → DEMO PREP** (MVP deployed; UX polish + screenshots on #3) |
| Concept | **SkinCast — LOCKED** (Lead over MirrorLane / ReturnShield) |
| Repo | CamDeans/youcam-ai-commerce |
| Branch (engineering) | `feat/skincast-mvp` · PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3) |
| Deploy (production) | **https://youcam-ai-commerce.vercel.app** — sha `0d84d16` (Design polish) promoted to production; mock re-verified 2026-09-29 |
| Vercel project | SOGIS / `youcam-ai-commerce` (`prj_2Ot0tEE6rDmIHnbDfpy5fWWQDTJn`) |
| Branch (research) | `cursor/docs-discover-research-4602` (merged; PR #2 closed) |
| Hackathon deadline | **Nov 2, 2026 @ 11:45am EST** (submission + registration end) |
| Submission opens | Sep 29, 2026 12:00 ET |
| Judging | Nov 3–20, 2026; winners ~Nov 24, 2026 |
| Official site | https://youcam-api-skin-ai-ecommerce.devpost.com/ |
| Rules | https://youcam-api-skin-ai-ecommerce.devpost.com/rules |

## Decisions

| ID | Decision | Status | Notes |
| --- | --- | --- | --- |
| D1 | Research-first; no app code until concept lock | Accepted (OS) | Lock complete → build authorized |
| D2 | YouCam must be essential to the product | Accepted | judging + OS |
| D3 | Concept = **SkinCast** (Skin Analysis + Skin Simulation + commerce) | **LOCKED by Lead (2026-09-29)** | PRODUCT_DECISION.md |
| D4 | Target platform for MVP = web (mobile-first) | Accepted | REST-friendly; Camera Kit optional later |
| D5 | Stack = Next.js App Router + Vercel | Accepted | ARCHITECTURE.md |
| D6 | Secrets never in git; server-side YouCam Bearer only | Accepted | SECURITY.md / API_INTEGRATION.md |
| D7 | Mock catalog OK for MVP; real payments out of scope | Accepted | Lead / Engineering |

## Open questions (need human / Lead)

1. ~~Confirm or reject SkinCast~~ — **LOCKED SkinCast.**
2. Devpost registration completed? Redeem code email received?
3. **YouCam account + `YOUCAM_API_KEY` + unit balance** — human must add key in Vercel → project **youcam-ai-commerce** → Settings → Environment Variables (Production + Preview), then redeploy. Also `.env.local` for local. See `docs/SECURITY.md`. Deployed site is **mock** until this is done.
4. Entrant eligibility (age, country — exclusions include China, Italy, Brazil, Quebec, etc.)?
5. Team composition / Representative? Women in Tech or Rising Star opt-in?
6. LLM provider for richer agent layer (optional; MVP uses rule-based matching)?
7. ~~Real Shopify vs mock catalog~~ — mock for MVP.
8. India-region ToS path needed?

## Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| No API key / units blocks real YouCam path | High | Human: Join Devpost → signup YouCam → redeem 1,000 units; mock mode unblocks UI demo |
| Unit burn (analysis + simulation + retries) | Medium | Cache; limit HD concerns; social bonus units |
| Image quality / API error codes kill demo | Medium | Upload guidance + mock fallback |
| Concept looks like API wrapper | High | Claim→concern mapping + commerce action shipped in slice |
| Medical/diagnosis perception | Medium | Retail wellness disclaimer on UI |
| Deadline slip (demo video + deploy) | Medium | Vertical slice early; compliance checklist |

## Tasks by workstream

### Discover (Agent 2) — complete
- [x] Devpost + rules captured
- [x] YouCam API research notes
- [x] ≥10 concepts scored
- [x] PRODUCT_DECISION RECOMMENDED → Lead LOCKED
- [x] HACKATHON_COMPLIANCE matrix
- [x] agent-state files seeded

### Lead / human (immediate)
- [x] Lock concept (D3) → SkinCast
- [ ] Devpost join + YouCam account + redeem units + store API key securely
- [ ] Confirm eligibility + special awards opt-in
- [x] Authorize Architect / Implement milestone

### Architect / Engineering
- [x] `docs/ARCHITECTURE.md` (SkinCast)
- [x] `docs/API_INTEGRATION.md`
- [x] Env/secrets pattern; server-only YouCam proxy
- [x] Vercel project linked + production deploy (mock verified)
- [ ] Update compliance privacy/deploy rows with final URLs for submit

### Build
- [x] Vertical slice scaffold: landing → upload → analysis → match → simulation → cart
- [x] Mock mode when `YOUCAM_API_KEY` absent; real APIs when present
- [x] Deploy to Vercel — **https://youcam-ai-commerce.vercel.app** (mock smoke OK)
- [ ] Production smoke with **real** YouCam key (blocked on human env)
- [x] README polish for judges (problem / solution / why YouCam)

### Design / QA
- [x] `docs/UX_SPEC.md` + commercial UI polish (hero, states, motion)
- [x] `docs/DEMO_SCRIPT.md` (1–3 min)
- [x] `docs/agent-state/design-qa.md` + mock-path light QA
- [x] Real app screenshots → project `media/skincast/`
- [ ] Live-key visual QA once human provisions key
- [ ] Record 1–3 min judge video from demo script

### Demo / Submit (later)
- [ ] Screenshots on Devpost + 1–3 min public video
- [ ] Optional social sharing bonus
- [ ] Final compliance audit; human submits

## Next actions (ordered)

1. **Human:** Add `YOUCAM_API_KEY` in Vercel project Settings → Environment Variables; redeploy; confirm `/api/health` → `youcamLive: true`.
2. **Engineering / Design:** Avoid thrashing UI vs API files; Design owns UX on #3; Engineering stays on deploy/config/API.
3. **Design/QA:** Re-capture live screenshots + shoot demo video per `DEMO_SCRIPT.md` once key is live.
4. **All:** Keep `HACKATHON_COMPLIANCE.md` rows updated.
5. **Lead/human:** Devpost join, eligibility, final submission package.

## Specialist state pointers

- Product: `docs/agent-state/product.md`
- Engineering: `docs/agent-state/engineering.md`
- Design/QA: `docs/agent-state/design-qa.md`
- Compliance: `docs/HACKATHON_COMPLIANCE.md`
- API research: `docs/research/youcam-api-overview.md`
- API integration: `docs/API_INTEGRATION.md`
- Architecture: `docs/ARCHITECTURE.md`
- Decision: `docs/PRODUCT_DECISION.md`
- UX: `docs/UX_SPEC.md`
- Demo: `docs/DEMO_SCRIPT.md`

## Changelog

| Date | Change |
| --- | --- |
| 2026-09-29 | Initial MASTER_STATE by Agent 2 (Discover) |
| 2026-09-29 | Lead LOCK SkinCast; milestone DESIGN→IMPLEMENT; Engineering MVP slice |
| 2026-09-29 | Production deploy https://youcam-ai-commerce.vercel.app verified mock; PRs #1/#2 closed → #3 |
| 2026-09-29 | Design/QA: UX_SPEC, DEMO_SCRIPT, UI polish, mock QA; milestone → DEMO PREP |
| 2026-09-29 | Engineering: production redeploy required for `0d84d16`; `/` + `/api/health` re-verified mock |
