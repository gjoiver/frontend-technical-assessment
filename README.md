# Personal Creative Portfolio

Front-end assessment monorepo: a personal portfolio made of a headless backend (Strapi) and a SPA (React) that consumes it.

## Structure

```
.
├── backend/    # Headless API with Strapi 5 (TypeScript, SQLite) — public read-only
└── frontend/   # React 18 + Vite SPA consuming the API (in progress)
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
npm install
npm run dev            # http://localhost:5173
```

> Not scaffolded yet — see the work plan in [frontend/ROADMAP.md](frontend/ROADMAP.md).

## Frontend architecture & criteria

The SPA is built to meet the assessment criteria: **fully responsive (mobile-first)**, **clean-code and best architecture practices**, and **component structure + styling + one unit test**.

Applied practices:

- **Clean Architecture** in layers per feature — `core` (domain: entities, repository ports, use cases/interactors), `data` (datasources, DTOs + mappers, repository implementations), `presentation` (React: pages, atomic components, hooks).
- **Repository + Interactor** consumption pattern: `Page → hook → ‹Action›UseCase (interactor) → Repository (port) → RepositoryImpl → DataSource → httpClient`.
- **Feature-based** structure (`features/portfolio`, later `features/products`), with a root **`shared/`** kernel for cross-cutting dependencies (design system, HTTP client, config, theme).
- **Atomic Design** for the UI: atoms → molecules → organisms → templates → pages.
- **SOLID** principles, with dependency inversion wired at a composition root (`app/`).
- **Rules of React** (https://react.dev/reference/rules): pure, idempotent components and hooks; immutable props/state; side effects only in effects/handlers.
- **Testing:** Vitest + React Testing Library, using the **AAA** pattern and **Gherkin** (Given/When/Then) scenario descriptions.

## Documentation

- Backend guardrails and conventions: [CLAUDE.md](CLAUDE.md)
- Backend roadmap: [backend/ROADMAP.md](backend/ROADMAP.md)
- Frontend work plan: [frontend/ROADMAP.md](frontend/ROADMAP.md)
