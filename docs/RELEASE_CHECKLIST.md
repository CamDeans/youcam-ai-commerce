# Release Checklist

Derived from the YouCam Hackathon Operating System. **All items start unchecked.**  
Mark only after verification — never claim done/deployed/tested without evidence.

**References:** Devpost · [Rules](https://youcam-api-skin-ai-ecommerce.devpost.com/rules) · `docs/SECURITY.md` · `docs/ARCHITECTURE.md`

---

## 0. Operating constraints (continuous)

- [ ] YouCam necessity is obvious to a judge
- [ ] No secrets in git history
- [ ] Docs under `/docs/agent-state/` stay synchronized
- [ ] Never claim done / deployed / tested without verification
- [ ] Max 4 agents; ownership boundaries respected
- [ ] Human-only gates not bypassed (MFA, payments, legal, final submission)

---

## 1. Discover

- [ ] Official Devpost page and rules reviewed (latest)
- [ ] YouCam API capabilities relevant to the concept documented
- [ ] Constraints / disallowed approaches noted for Lead

---

## 2. Ideate & lock

- [ ] ≥10 concepts scored
- [ ] Single concept locked in `docs/PRODUCT_DECISION.md`
- [ ] YouCam-essential rationale written for judges

---

## 3. Architect & compliance

- [ ] `docs/ARCHITECTURE.md` TBD sections filled for locked product
- [ ] Compliance / rules alignment reviewed before significant build
- [ ] `docs/SECURITY.md` env list matches planned integrations
- [ ] Privacy / image retention approach agreed

---

## 4. Build (vertical slices)

- [ ] Slice 0 spike: YouCam reachable with env-only credentials
- [ ] Slice 1 MVP: YouCam → visible result → commerce action (E2E)
- [ ] Error states and empty states demo-safe
- [ ] No secrets in client bundles or repo

---

## 5. Deploy & verify

- [ ] Production (or stable preview) URL live
- [ ] Production YouCam path verified with a real demo run
- [ ] Commerce action verified on deployed environment
- [ ] Smoke checklist recorded (steps + expected results)

---

## 6. Polish & demo

- [ ] README: what it is, why YouCam is essential, how to run, demo URL
- [ ] Screenshots / screen recording captured (no secrets visible)
- [ ] Demo script rehearsed (≤ judge attention span)

---

## 7. Final audit & submission

- [ ] Final audit vs **latest** Devpost rules
- [ ] Release checklist fully reviewed with Lead
- [ ] Human completes final Devpost submission
- [ ] Post-submit: agent-state updated with final URLs and commit SHA

---

## Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Engineering | | | |
| Lead | | | |
| Human (submission) | | | |
