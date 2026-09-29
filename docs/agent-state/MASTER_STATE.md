# MASTER_STATE

Lead-owned project state. Updated 2026-09-29 after compliance re-audit (official Devpost/rules re-fetched).

## Snapshot

| Field | Value |
| --- | --- |
| Milestone | **DEMO PREP → COMPLIANCE HARDENING** (~38% submission-ready; live YouCam + video + repo access still open) |
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
2. **Devpost Join completed?** Redeem-code email received? (still unverified — compliance 2026-09-29)
3. **YouCam account + redeem 1,000 units + `YOUCAM_API_KEY`** — CONDITIONAL GO to add key in Vercel (Production + Preview) then redeploy once Join + signup + redeem done. Confirm `/api/health` → `youcamLive: true`. Never git. See `docs/SECURITY.md`. Prod is still **mock**.
4. Entrant eligibility (age, excluded territories incl. China, Italy, Brazil, Quebec, Russia, Cuba, Iran, NK, Sudan, Belarus, Vietnam, Crimea/Donetsk/Luhansk, OFAC, etc.)?
5. Team composition / Representative? Women in Tech or Rising Star opt-in?
6. LLM provider for richer agent layer (optional; MVP uses rule-based matching)?
7. ~~Real Shopify vs mock catalog~~ — mock for MVP (Lead D7; compliance G6 OK if disclosed).
8. India-region ToS path needed?
9. **Repo access for judges:** make public + add LICENSE, **or** share private repo with `contact_event@PerfectCorp.com`? (currently private, no license — **Not met**)
10. Demo selfie / face likeness consent for public screenshots + video?
11. Prefer YouTube vs Vimeo for demo video? (Rules: YT/Vimeo; ignore Youku-only home copy — Rules prevail)

## Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| No API key / units → judges never see real YouCam (Stage 1 grey) | **Critical** | Human: Join → YouCam signup → redeem → Vercel env → live smoke + re-capture media |
| Private repo / no LICENSE / not shared with PerfectCorp | **Critical** | Public+LICENSE or email `contact_event@PerfectCorp.com` before submit |
| No 1–3 min public demo video / device footage | **Critical** | Shoot from `DEMO_SCRIPT.md` on live path; YouTube preferred |
| Mock-only screenshots on store | High | Re-shoot after live key; upload to Devpost form |
| Concept looks like API wrapper if mock-only | High | Live Analysis + Simulation in video; claim→concern already in code |
| Medical/diagnosis perception | Medium | Keep UI disclaimer; scrub video language |
| Unit burn (analysis + simulation + retries) | Medium | Cache; limit concerns; optional social bonus units |
| Image quality / API errors kill demo | Medium | Upload guidance; keep mock fallback for local only |
| Judging-date mismatch (Rules vs Devpost dates page) | Low | Follow Rules §1; ask wendy_yen@perfectcorp.com if needed |
| Deadline slip (video + Devpost package) | Medium | Compliance matrix + RELEASE_CHECKLIST; submit before Nov 2 11:45 ET |

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
- [ ] Screenshots on Devpost + 1–3 min public video (live path preferred)
- [ ] Optional social sharing bonus
- [x] Compliance re-audit vs official rules (2026-09-29) — **not** submission-ready (~38%)
- [ ] Human submits on Devpost

## Next actions (ordered)

1. **Human:** Confirm eligibility + Devpost Join + YouCam signup + redeem units.
2. **Human:** Add `YOUCAM_API_KEY` in Vercel (CONDITIONAL GO once step 1 done); redeploy; confirm `/api/health` → `youcamLive: true`.
3. **Human / Lead:** Resolve repo judge access (public+LICENSE **or** share with contact_event@PerfectCorp.com).
4. **Design/QA:** Re-capture **live** screenshots + shoot ≤3 min device video per `DEMO_SCRIPT.md`; host on YouTube/Vimeo.
5. **Lead/human:** Draft Devpost text description; optional WiT / Rising Star / social bonus; submit before Nov 2 11:45 ET.
6. **All:** Keep `HACKATHON_COMPLIANCE.md` honest — no fake “ready” claims.

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
| 2026-09-29 | Compliance audit: official Devpost/rules re-fetched; matrix rebuilt; ~38% ready; CONDITIONAL GO on credentials; critical gaps = live API, private/unlicensed repo, video |
