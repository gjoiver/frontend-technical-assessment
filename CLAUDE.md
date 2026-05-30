# CLAUDE.md

Context and working guardrails for this repository. It's a **monorepo**: the Strapi 5 backend lives in `backend/`, the React SPA lives in `frontend/`. Backend conventions are below; **frontend** conventions are in their own section near the end. Keep changes aligned with the conventions below.

## Project

Strapi 5 headless CMS for a **Personal Creative Portfolio** (front-end technical assessment). It exposes a **read-only public REST API** that the React SPA (in `frontend/`) will consume. Runs locally; deployment is not required.

## Stack (pinned)

- **Strapi 5.47.0** · **SQLite** (`better-sqlite3`) · **TypeScript**
- **Node:** 20–24 (see `backend/package.json` `engines`)
- Note: `backend/package.json` includes `react`, `react-dom`, `react-router-dom`, `styled-components` — these are Strapi's **admin panel** deps (needed by `strapi build`), NOT the SPA's. The SPA has its own `frontend/package.json` (React 19). Do not remove them from the backend.

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
    middlewares.ts  strapi::cors origin set from CLIENT_URL env
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
- ✅ Default populate in the controller `find` (explicit list: components + `projects` dynamic zone, not `'*'`).
- ✅ CORS origin set from `CLIENT_URL` env (default `http://localhost:5173`).
- ⛔ Seed data on bootstrap — **deferred to optional polish** (content is loaded via the admin panel for now; see `backend/ROADMAP.md` §10).

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

## Frontend (React SPA) — architecture & conventions

The SPA lives in `frontend/` (its own `package.json`). Run frontend commands from `frontend/` (`npm run dev`, `npm run build`, `npm run test`). Detailed plan in `frontend/ROADMAP.md`.

### Stack

- **React 19** · **Vite** · **TypeScript** · **styled-components** (v6) · **react-router-dom** (v6/v7)
- Tests: **Vitest** + **React Testing Library** (jsdom)

### Architecture (required)

- **Clean Architecture in layers, per feature** — dependencies point inward:
  - `core` → domain: entities, repository **ports** (interfaces), use cases (**interactors**). No React, no HTTP.
  - `data` → implements core ports: datasources (HTTP), DTOs + mappers, repository implementations.
  - `presentation` → React: pages, atomic components, hooks. Depends on `core` (entities/use cases), never on `data` directly.
- **Repository + Interactor** consumption chain: `Page → hook → ‹Action›UseCase (interactor) → Repository (port) → RepositoryImpl → DataSource → httpClient`.
- **Feature-based** under `src/features/` (`portfolio`, later `products`); a root **`src/shared/`** kernel holds cross-cutting deps (design system, http client, config, theme, common types).
- **Atomic Design** for UI: atoms → molecules → organisms → templates → pages (shared generic ones in `shared/ui`, feature-specific organisms in the feature's `presentation/components`).
- **Dependency inversion (SOLID-D):** wire concrete deps at the composition root (`src/app/`); presentation receives the interactor already built, never instantiates `data`.
- **Naming:** use cases are `‹Action›‹Entity›UseCase` (e.g. `GetPortfolioUseCase`), exposing `execute()`.
- **Path aliases:** `@/` → `src`, `@shared` → `src/shared`, `@features` → `src/features` (configured in `vite.config.ts` + `tsconfig.app.json`).

### TypeScript / class style

- **`erasableSyntaxOnly` is on** (Vite template). Therefore **no parameter properties, no `enum`, no `namespace`** — none are erasable. Use union types and `const` objects instead of enums.
- **Classes:** declare fields explicitly and assign in the constructor body (not via constructor-parameter shorthand). Add **explicit access modifiers** on every member: `public` for what's used outside (e.g. `error.kind`, `useCase.execute()`), `private` for injected internal deps.
- **Env:** only `VITE_`-prefixed vars reach the client; read via `import.meta.env`, centralized in `shared/lib/config` (never `process.env`). Type them by augmenting `ImportMetaEnv` in `src/vite-env.d.ts` (which must stay inside `src/` to be included, and must keep its `/// <reference types="vite/client" />`), so `import.meta.env.VITE_*` is `string` instead of `any`.

### React rules

- Components and hooks must be **pure and idempotent** — no side effects during render. Treat props/state as **immutable** (never mutate). Side effects (data fetching) go in effects/handlers. Follow the Rules of Hooks. Ref: https://react.dev/reference/rules

### HTTP & errors

- `shared/lib/http` exposes an injected `HttpClient` interface (not raw `fetch` calls scattered around). Errors are a typed `HttpError` with `kind: 'client' | 'server' | 'network' | 'parse'` (+ optional `status`) so the UI can branch on failure type (basis for Exercise 2's 5xx/4xx/network handling).

### Testing

- One unit test minimum (assessment). Use the **AAA** pattern (Arrange / Act / Assert) and **Gherkin**-style descriptions (`describe('Feature: …')` + `it('Scenario: given…, when…, then…')`). Prefer testing pure units (a use case with a mocked repository, or a mapper) to showcase the architecture's testability.

## Requirements (do not forget)

- Must run from a **clean clone** following only the README — `.env.example` is committed; secrets are generated with `openssl rand -base64 16`.
- **Document AI usage** as you work (README `AI Usage` section or `docs/AI_USAGE.md`).

## Do NOT

- Do not expose write operations on the public API.
- Do not use `entityService` or v4 `data.attributes` patterns — this is Strapi v5.
- Do not commit `.env` or the `.tmp/` SQLite database.
- Do not require manual admin-panel steps to get a working API — bootstrap should handle permissions and seed.
