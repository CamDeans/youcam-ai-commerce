# HACKATHON_COMPLIANCE

YouCam API Skin AI & eCommerce VTO Hackathon — living checklist.

**Official sources (re-fetched 2026-09-29 ~20:09 UTC):**

- [Devpost home](https://youcam-api-skin-ai-ecommerce.devpost.com/)
- [Official Rules](https://youcam-api-skin-ai-ecommerce.devpost.com/rules) — **prevail** over site copy if they conflict (Rules §11.D)
- [Devpost schedule](https://youcam-api-skin-ai-ecommerce.devpost.com/details/dates)
- YouCam signup / portal: [yce.perfectcorp.com/ai-api](https://yce.perfectcorp.com/ai-api) (images deleted in 24h per portal copy)
- Social bonus claim form: [forms.gle/JwMFYMpaExckupEk7](https://forms.gle/JwMFYMpaExckupEk7)

**Audit:** Compliance auditor · branch `feat/skincast-mvp` @ `e1526bd` · prod https://youcam-ai-commerce.vercel.app (`/api/health` → `youcamLive: false`, `mode: "mock"`) · PR [#3](https://github.com/CamDeans/youcam-ai-commerce/pull/3).

**Status legend**

| Status | Meaning |
| --- | --- |
| **Met** | Verified against current project/deploy/docs |
| **Partial** | Material progress; not submission-complete |
| **Not met** | Missing and in agent/team control |
| **Blocked on human** | Needs account, legal, identity, or Devpost action |
| **Grey area** | Ambiguous rule or risk; see Grey areas section |

---

## Schedule (Eastern)

| Phase | Window (authoritative) | Notes | Status |
| --- | --- | --- | --- |
| Registration | Sep 24, 2026 12:00 – Nov 2, 2026 11:45 ET | Rules §1 | Open; Join unverified → **Blocked on human** |
| Submission | Sep 29, 2026 12:00 – Nov 2, 2026 11:45 ET | Rules §1; Devpost dates agree on end | Open |
| Judging | Rules §1: Nov 3 12:00 – Nov 20 11:45 ET | Devpost dates page shows Nov 9 9:00 – Nov 20 17:00 — **Rules prevail** | N/A |
| Winners | On/around Nov 24, 2026 12:00 ET | Rules §1 / Devpost dates | N/A |

---

## Requirement inventory & gap matrix

### Eligibility & team (Rules §3, §4 Team)

| ID | Requirement | Source | Evidence / gap | Status |
| --- | --- | --- | --- | --- |
| E1 | Age of majority in residence | Rules §3 | No human attestation on file | **Blocked on human** |
| E2 | Not resident/domiciled in excluded territories (incl. Afghanistan, Antarctica, China, Djibouti, Iraq, Somalia, Venezuela, Western Sahara, Italy, Brazil, Quebec, Russia, Cuba, Iran, NK, Sudan, Belarus, Vietnam, Crimea/Donetsk/Luhansk, OFAC-sanctioned, etc.) | Rules §3 | Residence unknown | **Blocked on human** |
| E3 | Not Promotion Entity / employee / judge / conflict | Rules §3 | Self-attest needed | **Blocked on human** |
| E4 | Team/Org Representative authorized if multi-person | Rules §4 | Team size / Representative unset | **Blocked on human** |
| E5 | Optional Women in Tech (≥1 woman self-ID at submit) | Rules §8 | Opt-in unknown | **Blocked on human** |
| E6 | Optional Rising Star (enrolled student + .edu at submit) | Rules §8 | Opt-in unknown | **Blocked on human** |

### Accounts & API access (Rules §4; Devpost Get started)

| ID | Requirement | Source | Evidence / gap | Status |
| --- | --- | --- | --- | --- |
| A1 | Register / Join Hackathon on Devpost | Rules §4 | No Join confirmation in notes/MASTER_STATE | **Blocked on human** |
| A2 | Create YouCam API account | Rules §4; [portal](https://yce.perfectcorp.com/ai-api) | No account confirmation | **Blocked on human** |
| A3 | Redeem 1,000 free API units (email code; Account → Redeem; non-transferable; 90 days) | Rules §4; Devpost | Balance unknown; prod still mock | **Blocked on human** |
| A4 | Accept YouCam / Perfect Corp ToS (India path if applicable) | Rules §4 | Acceptance unknown; India path TBD | **Blocked on human** |
| A5 | Optional Social Sharing Bonus (tag @YouCam API; describe APIs; disclosure “Received API credits for sharing”; public ≥30 days; account predates Submission Period; form by deadline; max 1/platform ≤2) | Rules §8(F) | No video/post yet | **Not met** (optional) |

### Project requirements (Rules §4 Project; Devpost What to Build)

| ID | Requirement | Source | Evidence / gap | Status |
| --- | --- | --- | --- | --- |
| P1 | Working app integrates ≥1 Perfect Corp YouCam API | Rules §4; Devpost | Client implements File + Skin Analysis v2.1 + Skin Simulation v2.0 (`src/lib/youcam/client.ts`); **live path unverified** — prod `/api/health` mock | **Partial** |
| P2 | Clear consumer or eCommerce value | Rules §4; Devpost | SkinCast buy-confidence → matched cart (`PRODUCT_DECISION.md`, live UI) | **Met** (product intent); live proof still mock |
| P3 | Not surface-level wrapper / non-trivial | Devpost; Judging | Claim→concern matcher + commerce UX shipped; no LLM agent yet | **Partial** |
| P4 | Installs/runs consistently on intended platform; functions as described | Rules §4 | Web/mobile-first; mock E2E QA recorded; live YouCam unproven | **Partial** |
| P5 | Platform specified / matches submission | Rules §4 | Web (Next.js/Vercel) documented | **Met** |
| P6 | New build OR significant update after Submission Period start (Sep 29) | Rules §4 | Greenfield commits from 2026-09-29 (`feat/skincast-mvp`) | **Met** |
| P7 | Authorized use of third-party SDKs/APIs | Rules §4 | Next/React OSS; no LLM/Shopify keys yet; catalog is original mock | **Partial** |
| P8 | Allowed judging API categories: Skin, Beauty, Fashion, Jewelry & Watch, Hair & Beard | Rules §6 | Skin Analysis + Skin Simulation (Skin) | **Met** (planned APIs; live TBD) |

### Submission assets (Rules §4 Submission; Devpost What to Submit)

| ID | Requirement | Source | Evidence / gap | Status |
| --- | --- | --- | --- | --- |
| S1 | Code repo URL for judging | Rules §4 | https://github.com/CamDeans/youcam-ai-commerce | **Partial** (exists) |
| S2 | Repo public **with relevant licensing** OR private shared with contact_event@PerfectCorp.com | Rules §4; Devpost | GitHub **`private`**; **no LICENSE**; PerfectCorp share **not** confirmed | **Not met** |
| S3 | Repo contains source, assets, run instructions | Rules §4 | README + `.env.example` + docs; no secrets | **Met** |
| S4 | Text description: features, functionality, consumer/retail value | Rules §4; Devpost | README/PRODUCT_DECISION exist; **Devpost submission text not drafted/entered** | **Not met** |
| S5 | Screenshots of the project | Devpost What to Submit | 6 mock-path shots in project store `media/skincast/` (not in git; not on Devpost) | **Partial** |
| S6 | 1–3 min demo video end-to-end | Rules §4; Devpost | Script only (`DEMO_SCRIPT.md`); **no recording** | **Not met** |
| S7 | Video explains YouCam API(s) used | Rules §4 | Covered in script; not recorded | **Not met** |
| S8 | Video shows project on device for which it was built | Rules §4 | No device footage | **Not met** |
| S9 | Video public on YouTube (preferred) or Vimeo; link on form | Rules §4 | **Not** uploaded. Devpost home also lists Youku — Rules omit Youku → prefer YT/Vimeo | **Not met** / **Grey area** |
| S10 | No unlicensed 3P trademarks / copyrighted music in video | Rules §4 | N/A until video | **Not met** |
| S11 | Testing access: free URL/demo/build; credentials if private site | Rules §4 Testing | https://youcam-ai-commerce.vercel.app public (mock) | **Met** (access); live API **Partial** |
| S12 | English materials (or translations) | Rules §4 | English UI/docs | **Met** |
| S13 | Exit interview if winner | Devpost; Rules | Pre-agree | **Blocked on human** |
| S14 | Agree to blog feature if winner | Devpost | Pre-agree | **Blocked on human** |

### IP, conflicts, prizes (Rules §4 IP/Financial; §7–8)

| ID | Requirement | Source | Evidence / gap | Status |
| --- | --- | --- | --- | --- |
| I1 | Original work; Entrant owns IP; no 3P IP violation | Rules §4 IP / §7 | Original SkinCast code; stock/demo selfie ownership TBD | **Grey area** / **Blocked on human** |
| I2 | No prior Sponsor financial/preferential support conflict | Rules §4 Financial | Team attest | **Blocked on human** |
| I3 | Max one prize per Project | Rules §8 | N/A until win | N/A |
| I4 | Winner verification / affidavits ≤10 business days | Rules §8 | If selected | N/A |
| I5 | Prizes: 1st $2500, 2nd $1000, 3rd $500 + blog + meeting; WiT $1000; Rising Star $1000; pool $6000 | Rules §8; Devpost | Context only | N/A |

### Judging criteria readiness (Rules §6; Devpost)

| Criterion | Weight | Current honest read | Status |
| --- | --- | --- | --- |
| Stage 1 pass/fail (theme + required API) | Gate | Theme = Skin AI OK; **live YouCam not demonstrated** — mock may fail judge expectation for “required API” | **Partial** / **Grey area** |
| Technological Implementation | 25% | Solid client + vertical slice; live integration unproven; mock fallback present | **Partial** |
| Design | 25% | Commercial UI polish + UX_SPEC; coherent flow | **Partial** → near Met for mock UX |
| Potential Impact | 25% | Clear buy-confidence problem; mock cart limits “real” commerce proof | **Partial** |
| Quality of Idea | 25% | Analysis→simulate→cart is non-obvious vs quiz bots | **Met** (idea); demo must prove |

### Project OS / safety (team rules)

| ID | Requirement | Evidence | Status |
| --- | --- | --- | --- |
| O1 | No secrets in git | `.gitignore` env rules; `.env.example` placeholders; health does not leak key; spot-check clean | **Met** |
| O2 | Server-only YouCam Bearer | `YOUCAM_API_KEY` server routes; no `NEXT_PUBLIC_` key | **Met** |
| O3 | Privacy / face images | Portal: uploads deleted in 24h; MVP does not persist faces in DB; preview is request-scoped data URL | **Partial** (document in submission) |
| O4 | Non-medical positioning | UI disclaimer: “retail wellness demo — not medical advice or diagnosis” | **Met** |

---

## Grey areas (explicit)

| # | Ambiguity | Risk | Safe close |
| --- | --- | --- | --- |
| G1 | **Mock vs live YouCam for judging** — Rules require integrate ≥1 YouCam API and Stage 1 “reasonably applies required APIs.” Mock demo may look like a wrapper. | High (disqualify / Stage 1 fail) | Add key → redeem units → redeploy → prove `/api/health` `youcamLive: true` → re-shoot screenshots + video on **live** path. Disclose mock only if forced. |
| G2 | **Private repo + no license** vs “public with relevant licensing” OR share with `contact_event@PerfectCorp.com` | High (submission incomplete) | Prefer: add LICENSE (e.g. MIT) + make public **or** email PerfectCorp with private access before submit. Do both if unsure. |
| G3 | **Video host Youku** listed on Devpost home; Rules §4 list YouTube/Vimeo only | Medium | Use **YouTube (preferred)** or Vimeo. Rules prevail (§11.D). |
| G4 | **Judging window** Rules Nov 3–20 vs Devpost dates Nov 9–20 | Low (planning) | Plan availability for full Rules window; ask wendy_yen@perfectcorp.com if needed. |
| G5 | **Medical claims** — Skin Analysis marketed as dermatologist-verified on Perfect Corp site; SkinCast must not diagnose | Medium | Keep wellness disclaimer; never say “diagnosis,” “treat,” “cure”; video script already warns. |
| G6 | **Commerce “real” vs mock cart** — Rules ask consumer/eCommerce value, not live payments | Low–Med | Mock cart + clear “proof→purchase” story is OK per Lead D7; say “mock checkout” once in video; don’t claim Shopify/live payments. |
| G7 | **API unit usage evidence** — no rule requires a usage report, but units prove live work | Medium | After live demos, screenshot YouCam console balance/history for internal proof; optional mention in description. |
| G8 | **Public video + device footage** — must show on target device | Medium | Record browser on laptop **and** phone Safari/Chrome for web MVP; keep ≤3 min. |
| G9 | **“Built during hackathon”** — new or significantly updated after Submission start | Low | Greenfield Sep 29 commits satisfy; keep changelog; if prior assets reused, document in Devpost text. |
| G10 | **Third-party AI / LLM** — optional; must be authorized | Low today | MVP is rule-based matcher (no LLM). If LLM added later, document ToS + keep YouCam evidence primary. |
| G11 | **Demo selfie / face IP & privacy** — public screenshots/video of a face | Medium | Use consented/owned image; prefer non-identifying or team member with consent; avoid celebrity faces. |
| G12 | **India-region ToS/API path** | Low unless India entrant | Human confirms residence; use India links from Rules if applicable. |
| G13 | **Package `"private": true`** (npm) vs GitHub visibility | Low (confusion) | npm private ≠ GitHub private; still fix GitHub visibility/license for S2. |

---

## Prizes (context)

| Prize | Amount / extras |
| --- | --- |
| 1st | $2,500 + blog + Product/Dev Marketing meeting |
| 2nd | $1,000 + blog + meeting |
| 3rd | $500 + blog + meeting |
| Women in Tech | $1,000 |
| Rising Star (student) | $1,000 |
| Total cash pool | $6,000 |

A Project can win only **one** prize (Rules §8).

---

## Contacts

- Hackathon manager: wendy_yen@perfectcorp.com  
- Private repo share: contact_event@PerfectCorp.com  
- API support: YouCamOnlineEditor_API@perfectcorp.com  
- Devpost support: support@devpost.com  

---

## Overall readiness (this audit)

| Metric | Value |
| --- | --- |
| Submission readiness | **~38%** — prototype + docs strong; registration, live API, repo access, video, Devpost package missing |
| Go / no-go for adding `YOUCAM_API_KEY` | **CONDITIONAL GO** — engineering/deploy plumbing ready; add key only after human completes Devpost Join + YouCam signup + redeem; never commit secrets |
| Fake “ready to submit” claim? | **No** — not submission-ready |

Update this file whenever a row changes. Lead-facing verdict: project store `docs/compliance-readiness.md`.
