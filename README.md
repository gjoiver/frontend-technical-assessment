# Personal Creative Portfolio

Front-end assessment monorepo: a personal portfolio made of a headless backend (Strapi) and a SPA (React) that consumes it.

## Structure

```
.
├── backend/    # Headless API with Strapi 5 (TypeScript, SQLite) — public read-only
└── frontend/   # React 19 + Vite SPA consuming the API
```

Each folder is an independent app with its own `package.json`, installed and run separately.

## Getting started

### Backend

```bash
cd backend
cp .env.example .env   # then generate values: openssl rand -base64 16
npm install
npm run develop        # http://localhost:1337  (admin at /admin, API at /api/portfolio)
```

See [backend/README.md](backend/README.md) for details, the content model and the API surface.

### Frontend

```bash
cd frontend
cp .env.example .env   # VITE_API_URL → the backend (default http://localhost:1337)
npm install
npm run dev            # http://localhost:5174
```

See [frontend/README.md](frontend/README.md) for the architecture, scripts and testing. The dev server is pinned to port **5174** (the backend's allowed CORS origin), so keep the backend running.

## Frontend architecture & criteria

The SPA is built to meet the assessment criteria: **fully responsive (mobile-first)**, **clean-code and best architecture practices**, and **component structure + styling + one unit test**.

Applied practices:

- **Clean Architecture** in layers per feature — `core` (domain: entities, repository ports, use cases/interactors), `data` (datasources, DTOs + mappers, repository implementations), `presentation` (React: pages, atomic components, hooks).
- **Repository + Interactor** consumption pattern: `Page → hook → <Feature>Interactor (facade) → ‹Action›UseCase → Repository (port) → RepositoryImpl → DataSource → httpClient`.
- **Feature-based** structure (`features/portfolio`, later `features/products`), with a root **`shared/`** kernel for cross-cutting dependencies (design system, HTTP client, config, theme).
- **Atomic Design** for the UI: atoms → molecules → organisms → templates → pages.
- **SOLID** principles, with dependency inversion wired at a composition root (`app/`).
- **Rules of React** (https://react.dev/reference/rules): pure, idempotent components and hooks; immutable props/state; side effects only in effects/handlers.
- **Testing:** Vitest — the unit test covers the `PortfolioMapper` (pure DTO→entity mapping) with the **AAA** pattern, **Gherkin** (Given/When/Then) scenario names, and fixtures in `data/mocks/`.

## Documentation

- Guardrails and conventions (backend + frontend): [CLAUDE.md](CLAUDE.md)
- Backend details: [backend/README.md](backend/README.md) · roadmap: [backend/ROADMAP.md](backend/ROADMAP.md)
- Frontend details: [frontend/README.md](frontend/README.md) · roadmap: [frontend/ROADMAP.md](frontend/ROADMAP.md)
