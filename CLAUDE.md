# CLAUDE.md

Context and working guardrails for this repository. It's a **monorepo**: the Strapi 5 backend lives in `backend/`, the React SPA will live in `frontend/`. These guardrails cover the **backend**. Keep changes aligned with the conventions below.

## Project

Strapi 5 headless CMS for a **Personal Creative Portfolio** (front-end technical assessment). It exposes a **read-only public REST API** that the React SPA (in `frontend/`) will consume. Runs locally; deployment is not required.

## Stack (pinned)

- **Strapi 5.47.0** · **SQLite** (`better-sqlite3`) · **TypeScript**
- **Node:** 20–24 (see `backend/package.json` `engines`)
- Note: frontend deps (`react`, `react-dom`, `react-router-dom`, `styled-components`) are still in `backend/package.json` from the Strapi scaffold — they belong to the SPA and should move to `frontend/` once it's scaffolded.

## Structure (monorepo)

```
.                   repo root (git, README.md, CLAUDE.md)
backend/            the Strapi app — run all backend commands from here (incl. ROADMAP.md)
  src/
    api/
      portfolio/    single type — content-types/ controllers/ routes/ services/ (all .ts)
    components/
      portfolio/contact-info.json
      portfolio/project.json
      portfolio/skill.json
      portfolio/seo.json
      portfolio/experience.json
    index.ts        register/bootstrap (bootstrap grants the Public `find` permission; seed still pending)
  config/
    middlewares.ts  includes strapi::cors (still default config — no explicit origin yet)
    server.ts admin.ts api.ts database.ts plugins.ts
  .env.example      committed; .env is gitignored
frontend/           the React SPA (not scaffolded yet)
```

## Commands (run from `backend/`)

```bash
cd backend
npm run develop   # dev server with autoreload (http://localhost:1337)
npm run build     # build the admin panel
npm run start     # production-mode server
```

## Content model (as actually built)

A **single `portfolio` single type** (draft & publish ON) holds everything, rather than separate Profile/Project types:

- `aboutMe` — rich `blocks`
- `contactInformation` — single `portfolio.contact-info` component: `email`, `phone`, `socialMedia` (json)
- `projects` — **dynamic zone** of `portfolio.project` components: `title` (required), `description` (blocks), `technologies` (json)
- `skills` — repeatable `portfolio.skill` component: `name` (required), `level` (enum: `Beginner` / `Intermediate` / `Advanced`)
- `seo` — single `portfolio.seo` component: `metaTitle` (required), `metaDescription` (required), `keywords`
- `experience` — repeatable `portfolio.experience` component: `title` (required), `company` (required), `duration`, `responsibilities` (blocks)

## API surface (contract for the frontend that consumes this)

- `GET /api/portfolio` — the single portfolio with its components and the `projects` dynamic zone.
- **Response shape (v5, flattened):** `{ data: { id, documentId, ...fields }, meta }` — there is **no** `data.attributes` nesting (that was v4).
- **Image URLs (if/when media is added) are relative** (`/uploads/...`) — the consumer must prefix the Strapi origin.

## Current state (what's done vs. pending)

- ✅ Content model + components scaffolded (single type `portfolio`, incl. `experience`).
- ✅ Public-role `find` permission — granted in `bootstrap` (idempotent).
- ⛔ Default populate in the controller — **not done** (still the bare core controller).
- ⛔ Seed data on bootstrap — **deferred to optional polish** (content is loaded via the admin panel for now; see ROADMAP §10).
- ⛔ CORS origin — **not set** (only the default `strapi::cors` entry is present).

## Architecture & conventions (targets to uphold)

- The public REST API must stay **read-only**. Grant the Public role only `find` on `api::portfolio.portfolio`. Never expose create/update/delete publicly.
- Prefer overriding the controller `find` to **populate components + the dynamic zone by default**, so consumers never send deep populate queries. Use explicit populate over `populate: '*'`.
- Configure public permissions and seed data **automatically** in `backend/src/index.ts` `bootstrap` (idempotent: only seed when empty, only add missing permissions).
- Use the **Document Service API** (`strapi.documents(...)`) — not `entityService` (deprecated in v5).

## Coding conventions

- **Conventional commits:** `feat` / `fix` / `chore` / `docs` / `refactor`.
- Keep controllers thin; prefer the default core controller + targeted overrides.
- Document technical decisions in the README (Strapi 5, SQLite, read-only surface, single-type vs. split types, populate-in-controller).

### TypeScript typing

- Type the Strapi instance with `Core.Strapi` from `@strapi/strapi`. In `src/index.ts`, annotate the lifecycle hooks: `register({ strapi }: { strapi: Core.Strapi })` and `async bootstrap({ strapi }: { strapi: Core.Strapi })` (import it as `import type { Core } from '@strapi/strapi'`). Without it `strapi` is implicitly `any` and you lose autocomplete on `strapi.query` / `strapi.documents` / `strapi.log`.
- `strapi.query(...)` and `strapi.documents(...)` return loosely-typed results; narrow or cast at the call site when you need a specific shape rather than spreading `any` through the code.
- Prefer `import type { ... }` for type-only imports (e.g. `Core`) so they're erased from the build.
- Generated types live in `types/generated/` — let Strapi regenerate them; do not edit by hand.

## Requirements (do not forget)

- Must run from a **clean clone** following only the README — `.env.example` is committed; secrets are generated with `openssl rand -base64 16`.
- **Document AI usage** as you work (README `AI Usage` section or `docs/AI_USAGE.md`).

## Do NOT

- Do not expose write operations on the public API.
- Do not use `entityService` or v4 `data.attributes` patterns — this is Strapi v5.
- Do not commit `.env` or the `.tmp/` SQLite database.
- Do not require manual admin-panel steps to get a working API — bootstrap should handle permissions and seed.
