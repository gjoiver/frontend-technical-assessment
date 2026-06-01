# Security — Dependency Audit & Risk Notes

## `npm audit` summary (2026-06-01)

`37 vulnerabilities (6 low · 18 moderate · 13 high)`.

**All of them are transitive dependencies of Strapi itself — not of this project's own code.**
From the dependency tree: `@strapi/core`, `@strapi/permissions`, `@strapi/types`,
`@strapi/data-transfer`, `@strapi/plugin-users-permissions`, `koa-session`, `purest`,
`request-oauth` / `request-multipart`, `uuid`, `qs`.

## Why they are not auto-fixed

- `npm audit fix` (the safe form) resolves **none** of them — every advisory needs `--force`.
- `npm audit fix --force` would install **`@strapi/plugin-users-permissions@5.9.0`**, a
  **breaking change** that desyncs from the pinned **Strapi 5.47.0** and can break the
  admin/auth plugin.
- The real fixes must come **upstream** (a patched Strapi release), not from this repository.

➡️ **Decision: do _not_ run `--force`.** Forcing would trade a low, theoretical risk for a high,
certain chance of breaking the app. Track upstream and bump Strapi when a patched 5.x lands.

## Risk assessment — why this is low-risk in context

- **Local only / not deployed** — runs on `localhost`, not internet-facing.
- **Read-only public API** — the Public role has only `find` on `portfolio` / `page`; no
  create/update/delete and no public auth surface.
- The vulnerable code paths (e.g. `uuid` buffer-bounds in v3/v5/v6, `qs`, `koa-session`,
  `purest` OAuth) are **not exercised** by this app: no file uploads, no OAuth, no public
  session flows.
- Existing hardening: secrets in `.env` (gitignored, generated per environment), **CORS locked
  to `CLIENT_URL`**, and a read-only Public role.

## Mitigation plan

1. Periodically run `npm audit` and **upgrade Strapi** (`@strapi/*`) to a patched 5.x release
   when available — that is where the fixes land.
2. Re-run `npm audit` after each Strapi bump.
3. Before any real deployment: re-evaluate the then-current advisories, add rate limiting, and
   review the exposed surface.
