# Architecture (TEMPLATE)

> **Status:** Template only. Product concept is **not finalized**.  
> Fill TBD sections after `docs/PRODUCT_DECISION.md` is locked.  
> Do not treat this file as an implementation green light.

**Related:** `docs/agent-state/engineering.md` · Project OS · Devpost rules

---

## 1. Purpose

Describe the system that delivers a commercially credible Skin AI / eCommerce VTO experience where **YouCam is essential**.

| Field | Value |
|-------|--------|
| Product name | TBD — pending Product Research |
| One-line pitch | TBD |
| Primary YouCam capability | TBD (Skin AI / VTO / other) |
| Commerce action | TBD |

---

## 2. What the current repo already implies

Greenfield audit (`main` as of 2026-09-29):

- Repository exists and is empty of application code (`README.md` title only).
- **No implied framework** (no Next.js, Vite, Python, etc.).
- **No implied database, auth, or payments stack.**
- **No implied monorepo or package layout.**
- Docs and security scaffolding live under `/docs` and root policy files (this PR).
- Default branch for merges: `main`. Prefer additive docs commits that do not overwrite Research-owned files (`PRODUCT_DECISION`, compliance).

Stack selection is therefore **open** and must follow the locked product decision (hosting needs, realtime VTO vs async Skin AI, commerce provider, etc.).

---

## 3. High-level system (TBD)

```
[Client UI] --TBD--> [App / API layer] --TBD--> [YouCam APIs]
                              |
                              +--TBD--> [Commerce / catalog / checkout]
```

### Components (fill after lock)

| Component | Responsibility | TBD |
|-----------|----------------|-----|
| Frontend | Capture / upload / try-on UI | Framework, routing, hosting |
| Backend / BFF | Hide YouCam secrets; orchestrate flows | Runtime, routes |
| YouCam integration | Skin analysis and/or VTO | Endpoints, SDKs, quotas |
| Commerce | Product match, cart, checkout or CTA | Provider |
| Storage | Images, session, results (if any) | Provider + retention |
| Auth (if any) | User / demo accounts | Provider |

---

## 4. Vertical slice (required pattern)

Build **end-to-end** slices, not horizontal-only layers:

1. User triggers YouCam-backed action (photo / camera / SKU try-on).
2. System returns a **visible YouCam-dependent result**.
3. User takes a **commerce action** informed by that result.

| Slice | User action | YouCam | Result | Commerce | Status |
|-------|-------------|--------|--------|----------|--------|
| Slice 0 (spike) | TBD | TBD | TBD | TBD | Blocked on product |
| Slice 1 (MVP) | TBD | TBD | TBD | TBD | — |

---

## 5. Data & privacy (TBD)

- Image / biometric handling: TBD (minimize retention; document retention window).
- PII: TBD.
- Third parties: YouCam + TBD commerce / hosting.
- See also `docs/SECURITY.md`.

---

## 6. Environments (TBD)

| Env | URL | Notes |
|-----|-----|-------|
| Local | `http://localhost:TBD` | `.env.local` only |
| Preview | TBD | No secrets in git |
| Production | TBD | Human for irreversible prod steps |

---

## 7. Non-goals (until product lock)

- Choosing a final UI brand system.
- Committing framework scaffolding that pretends the product is decided.
- Claiming deploy readiness.

---

## 8. Decision log

| Date | Decision | Owner |
|------|----------|-------|
| 2026-09-29 | Architecture file created as template; stack deferred | Engineering |
| TBD | Product lock → fill sections 1–6 | Lead + Engineering |

---

## 9. Open questions for Product / Lead

1. Which YouCam APIs are mandatory for the chosen concept?
2. Is realtime camera VTO required, or is upload / async Skin AI enough?
3. What is the minimum credible commerce action for judging?
4. Any hard constraints on stack (Next.js, Shopify, Stripe, etc.)?
