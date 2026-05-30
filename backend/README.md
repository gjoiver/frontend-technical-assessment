# Backend — Personal Creative Portfolio (Strapi 5)

A **read-only** headless API that serves the portfolio content for the React SPA to consume. Built with Strapi 5 + TypeScript on SQLite. Runs locally; no deployment required.

## Stack

- **Strapi 5.47** · **TypeScript** · **SQLite** (`better-sqlite3`)
- **Node:** 20–24 (see `engines` in `package.json`)

## Prerequisites

- Node.js 20–24 and npm
- `openssl` (to generate the `.env` secrets)

## Installation & startup

From the monorepo root, enter the backend folder:

```bash
cd backend
```

1. **Copy the environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Generate the secrets.** The `tobemodified` placeholders in `.env` won't work; replace them with random values:
   ```bash
   openssl rand -base64 16
   ```
   Generate one per secret (`API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`). For `APP_KEYS`, use several comma-separated keys.

3. **Install dependencies and run:**
   ```bash
   npm install
   npm run develop
   ```
   The server runs at `http://localhost:1337` (admin at `/admin`, API at `/api/portfolio`).

4. **Create the admin user** on first run at `http://localhost:1337/admin`.

## Loading content

The database (`.tmp/data.db`) is gitignored, so a fresh clone starts **with no content**. To populate it:

1. Open the admin → **Content Manager** → **Portfolio** (Single Types).
2. Fill in the fields (see *Content model* below). Required: `project.title`, `skill.name`, `experience.title` + `company`, `seo.metaTitle` + `metaDescription`.
3. Click **Publish** — with *draft & publish* enabled, the public API only returns published content.

Until you publish, `GET /api/portfolio` returns `data: null`. That's expected.

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/portfolio` | The portfolio with its components and the `projects` dynamic zone, already populated. |

- **Read-only:** the Public role only has `find`. Writes (`POST`/`PUT`/`DELETE`) return `403/405`.
- **Response shape (v5):** `{ data: { id, documentId, ...fields }, meta }` — no `data.attributes` nesting (that was v4).
- **Automatic populate:** the controller populates components and the dynamic zone by default, so the client does **not** need to send `?populate=...`.
- **CORS:** only the `CLIENT_URL` origin is allowed (defaults to `http://localhost:5173`).

## Content model

A single **`portfolio`** single type (draft & publish) with:

- `aboutMe` — rich text (blocks)
- `contactInformation` — component: `email`, `phone`, `socialMedia` (json)
- `projects` — dynamic zone of `project`: `title` (required), `description` (blocks), `technologies` (json)
- `skills` — repeatable component: `name` (required), `level` (enum: Beginner/Intermediate/Advanced)
- `experience` — repeatable component: `title` (required), `company` (required), `duration`, `responsibilities` (blocks)
- `seo` — component: `metaTitle` (required), `metaDescription` (required), `keywords`

## Technical decisions

- **Single type** instead of split types (Profile/Project): the portfolio is a single-page aggregate; one document keeps SPA consumption simple.
- **Automatic public permissions:** granted idempotently in `src/index.ts` (`bootstrap`), so a clean clone exposes the API with no manual admin steps.
- **Populate in the controller:** `find` is overridden to populate components and the dynamic zone by default (explicit list, not `'*'`), keeping a stable contract for the client.
- **Read-only:** write operations are never exposed to the Public role.
- **Document Service API** (`strapi.documents`), not `entityService` (deprecated in v5).
- **Explicit CORS** by environment (`CLIENT_URL`) instead of a wildcard.

## Structure

```
backend/
  config/        server, database, middlewares (CORS), etc.
  src/
    api/portfolio/         content-type, controller (populate), routes, services
    components/portfolio/  contact-info, project, skill, experience, seo
    index.ts               bootstrap: public permissions
  .env.example   variables template (committed; .env is ignored)
```

## AI Usage

This backend was built with AI assistance (Claude) in a step-by-step guided flow:

- **Roadmap design** and dependency-ordered tasks (permissions → content → populate → CORS), documented in `./ROADMAP.md`.
- **Reasoned architecture decisions**, dropping over-engineering where it added no value (e.g. formal Clean Architecture, plugin-based deep populate, a mandatory seed) in favor of idiomatic Strapi practices.
- **Conceptual explanations** of roles/permissions, populate, TypeScript typing and CORS, with the code applied by hand to reinforce learning.

See conventions in `../CLAUDE.md` and progress in `./ROADMAP.md`.
