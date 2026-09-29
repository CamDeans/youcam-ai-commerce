# Security

Secrets, credentials, and pre-push hygiene for `CamDeans/youcam-ai-commerce`.

---

## Secrets policy

### Allowed locally

| File | Purpose | Commit? |
|------|---------|---------|
| `.env.local` | Real API keys, tokens, webhook secrets | **NEVER** |
| Other local override files listed in `.gitignore` | Machine-specific config | **NEVER** |

### Allowed in git

| File | Purpose | Commit? |
|------|---------|---------|
| `.env.example` | **Placeholders only** (empty or `your_*_here`) | Yes |
| Docs describing *names* of env vars (not values) | Onboarding | Yes |

### Never commit

- YouCam API keys / client secrets
- Stripe / payment keys
- OAuth client secrets, refresh tokens
- Database URLs with passwords
- Private keys, certificates, `.pem` / `.p12`
- Production webhook signing secrets
- Any file that contains live credentials, even “temporarily”

If a secret is committed by mistake: **rotate the credential immediately**, remove from history if needed, and document the incident for the Lead. Do not only delete the file in a follow-up commit.

---

## Environment variable conventions

1. Document every required variable in `.env.example` with a placeholder.
2. Load secrets only from environment / platform secret stores (Vercel, etc.).
3. Prefer server-side / BFF usage for YouCam keys — do not expose secret keys to the browser.
4. Public client IDs (if any) may be prefixed clearly (e.g. `NEXT_PUBLIC_*`) only when the provider documents them as public.

Example shape (placeholders only):

```bash
# .env.example
YOUCAM_API_KEY=
YOUCAM_API_BASE_URL=
# COMMERCE_PROVIDER_KEY=
# DATABASE_URL=
```

---

## Human-only steps

Do **not** automate or agent-bypass:

- Account identity / MFA
- Payments and billing acceptance
- Legal / ToS acceptance
- Production credentials that cannot be configured safely via env
- Final Devpost submission

---

## Pre-push checklist

Run before every `git push` (and before opening/updating a PR):

- [ ] No `.env`, `.env.local`, or credential files staged
- [ ] `git diff --cached` reviewed for accidental keys/tokens
- [ ] `.env.example` contains placeholders only (no real values)
- [ ] Screenshots / recordings do not show live secrets or dashboard keys
- [ ] New env vars documented in `.env.example` and noted in agent-state if relevant
- [ ] No “temporary” hard-coded secrets in source, tests, or docs
- [ ] CI / deploy configs reference secret *names*, not values

### Quick local scan (optional)

```bash
git status
git diff --cached
# Fail if common secret filenames are tracked:
git ls-files | grep -E '(^\.env$|\.env\.local|id_rsa|\.pem$)' && echo 'BLOCK: secret-like path tracked' || true
```

---

## Reporting

Suspected leak → stop pushing → rotate → notify Lead → update `docs/agent-state/engineering.md`.
