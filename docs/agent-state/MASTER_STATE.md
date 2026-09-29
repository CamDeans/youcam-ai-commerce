# MASTER_STATE

Lead-owned project state. Initialized by Agent 2 (Discover) 2026-09-29. Lead should take ownership and amend freely.

## Snapshot

| Field | Value |
| --- | --- |
| Milestone | **DISCOVER** |
| Concept | **TBD** — RECOMMENDED: **SkinCast** (see `docs/PRODUCT_DECISION.md`) |
| Repo | CamDeans/youcam-ai-commerce |
| Branch (research) | `cursor/docs-discover-research-4602` |
| Hackathon deadline | **Nov 2, 2026 @ 11:45am EST** (submission + registration end) |
| Submission opens | Sep 29, 2026 12:00 ET |
| Judging | Nov 3–20, 2026; winners ~Nov 24, 2026 |
| Official site | https://youcam-api-skin-ai-ecommerce.devpost.com/ |
| Rules | https://youcam-api-skin-ai-ecommerce.devpost.com/rules |

## Decisions

| ID | Decision | Status | Notes |
| --- | --- | --- | --- |
| D1 | Research-first; no app code until concept lock | Accepted (OS) | preferences / hackathon OS |
| D2 | YouCam must be essential to the product | Accepted | judging + OS |
| D3 | Recommended concept = SkinCast (Skin Analysis + Skin Simulation + agentic commerce) | **RECOMMENDED — needs Lead confirm** | PRODUCT_DECISION.md |
| D4 | Target platform for MVP = web (mobile-first) | Proposed | REST-friendly; Camera Kit optional |
| D5 | Suggested stack = Next.js + Vercel | Proposed | not locked |
| D6 | Secrets never in git; server-side YouCam key | Accepted | OS |

## Open questions (need human / Lead)

1. Confirm or reject **SkinCast**; if reject, pick runner-up (MirrorLane / ReturnShield).
2. Devpost registration completed? Redeem code email received?
3. YouCam account + API key + unit balance available for builders?
4. Entrant eligibility (age, country — note exclusions include China, Italy, Brazil, Quebec, etc.)?
5. Team composition / Representative? Women in Tech or Rising Star opt-in?
6. LLM provider for agent layer (and key)?
7. Real Shopify vs mock catalog for MVP?
8. India-region ToS path needed?

## Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| No API key / units blocks Build | High | Human: Join Devpost → signup YouCam → redeem 1,000 units |
| Unit burn (analysis + simulation + retries) | Medium | Cache; limit HD concerns; social bonus units |
| Image quality / API error codes kill demo | Medium | Camera Kit guidance + judge fallback samples |
| Concept looks like API wrapper | High | Ship claim-mapping + agent + commerce action |
| Medical/diagnosis perception | Medium | Retail wellness disclaimer |
| Deadline slip (demo video + deploy) | Medium | Vertical slice early; compliance checklist |

## Tasks by workstream

### Discover (Agent 2) — this pass
- [x] Devpost + rules captured
- [x] YouCam API research notes
- [x] ≥10 concepts scored
- [x] PRODUCT_DECISION RECOMMENDED
- [x] HACKATHON_COMPLIANCE matrix
- [x] agent-state files seeded

### Lead / human (immediate)
- [ ] Lock concept (D3)
- [ ] Devpost join + YouCam account + redeem units + store API key securely
- [ ] Confirm eligibility + special awards opt-in
- [ ] Authorize Architect milestone

### Architect (blocked on D3)
- [ ] `docs/ARCHITECTURE.md`
- [ ] Env/secrets pattern; YouCam proxy design
- [ ] Update compliance privacy/deploy rows

### Build (blocked on Architect + API key)
- [ ] Vertical slice: upload → analysis → UI scores
- [ ] Simulation + catalog match + cart
- [ ] Deploy + README

### Demo / Submit (later)
- [ ] Screenshots, 1–3 min video, Devpost text
- [ ] Optional social sharing bonus
- [ ] Final compliance audit; human submits

## Next actions (ordered)

1. **Lead:** Confirm SkinCast (or alternate) in PRODUCT_DECISION status → LOCKED.
2. **Human:** Complete Devpost + YouCam onboarding; place `YOUCAM_API_KEY` in secure env only.
3. **Lead:** Spawn Architect to produce ARCHITECTURE.md against locked concept.
4. **All:** Keep `HACKATHON_COMPLIANCE.md` rows updated as work proceeds.
5. **Avoid:** Application feature coding until D3 locked (per OS).

## Specialist state pointers

- Product: `docs/agent-state/product.md`
- Compliance: `docs/HACKATHON_COMPLIANCE.md`
- API research: `docs/research/youcam-api-overview.md`
- Concepts: `docs/research/concept-scorecard.md`
- Decision: `docs/PRODUCT_DECISION.md`

## Changelog

| Date | Change |
| --- | --- |
| 2026-09-29 | Initial MASTER_STATE by Agent 2 (Discover) |
