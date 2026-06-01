# Frontend — Personal Creative Portfolio (React SPA)

A React SPA with two features — a **portfolio** (consuming the Strapi API) and a **products** catalog (consuming the external [Fake Store API](https://fakestoreapi.com) plus Strapi page copy) — rendered as **responsive, mobile-first** pages. Built with **Clean Architecture**, **Atomic Design** and a **Repository + Interactor** pattern.

## Stack

- **React 19** · **Vite** · **TypeScript**
- **styled-components** v6 (theming + design tokens)
- **react-router-dom** v7
- **react-icons** (UI + brand icons)
- **@strapi/blocks-react-renderer** (Strapi rich-text blocks)
- **Vitest** + **React Testing Library** (unit & hook tests)

## Prerequisites

- Node.js 20–24 and npm
- **The backend running** (see [../backend](../backend)) — the SPA fetches `GET /api/portfolio` and `GET /api/page` from it, with content **published** in the Strapi admin.
- **Internet access** — the `products` page also fetches from the public [Fake Store API](https://fakestoreapi.com).

## Installation & startup

```bash
cd frontend
cp .env.example .env     # VITE_API_URL → backend (default http://localhost:1337); VITE_FAKESTORE_URL → products API
npm install
npm run dev              # http://localhost:5174
```

> **CORS / port:** the dev server is pinned to **5174** (`vite --port 5174`) because the backend's CORS allows that origin. Keep the backend at `http://localhost:1337`.

## Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Dev server (port 5174)                  |
| `npm run build` | Typecheck (`tsc -b`) + production build |
| `npm run test`  | Unit tests (Vitest)                     |
| `npm run lint`  | ESLint                                  |

## Architecture

**Clean Architecture in layers, per feature** — dependencies point inward:

- **`core`** — domain: entities, repository **ports** (interfaces), use cases, and the per-feature **interactor**. No React, no HTTP.
- **`data`** — implements the core ports: DTOs + mapper (owns the Strapi wire shape), datasource (HTTP), repository implementation.
- **`presentation`** — React: the `usePortfolio` hook, atomic components (organisms), the page.

**Consumption chain (Repository + Interactor):**

```
PortfolioPage → usePortfolio (hook) → PortfolioInteractor (facade)
  → GetPortfolioUseCase → PortfolioRepository (port)
  → PortfolioRepositoryImpl → StrapiPortfolioDataSource → httpClient → Strapi
```

The same pattern powers the **`products`** feature, which fans out to **two** sources in parallel (one `httpClient` per origin):

```
ProductsPage → useProductsPage (hook) → ProductsInteractor (facade)
  → GetProductsPageUseCase → Promise.all(ProductRepository, PageRepository)
  → …RepositoryImpl → DataSource → httpClient → Fake Store API (products) + Strapi (page copy)
```

A root **`src/shared/`** kernel holds cross-cutting deps (design system, HTTP client, config, theme, and the `Mapper`/`UseCase` base contracts). All concrete wiring happens at the **composition root** (`src/app/`); presentation receives the interactor already built.

**Atomic Design** for UI: atoms → molecules → organisms → templates → pages.

## Structure

```
src/
  app/                       # composition root: DI wiring, router, App
  shared/
    ui/                      # design system: atoms, molecules, theme (tokens, GlobalStyle)
    lib/                     # httpClient, config (env), Mapper & UseCase base contracts
  features/
    portfolio/
      core/                  # entities, repositories (ports), usecases, interactors
      data/                  # dto, mappers (+ mocks), datasources, repositories (impl)
      presentation/          # hooks, components (organisms), pages, i18n
    products/                # same layering; combines Fake Store products + Strapi page copy
      core/ data/ presentation/
```

## Testing

**Vitest** (+ **React Testing Library** / jsdom for the hook & component tests), reusing the Vite config (path aliases work with no extra setup).

> **Why more than one test?** The assessment asked for **one** unit test; we deliberately added **six**. The highest-value cases — HTTP error **branching by class**, the typed-`HttpError` **classification**, and error **propagation** — are **hard to reproduce by hand** (you can't reliably force a `500`, a dropped connection, or malformed JSON from the browser). Unit tests with **mocked collaborators** are the dependable way to exercise exactly those atypical paths.

Six suites, each targeting a **single responsibility**:

- **`PortfolioMapper`** — DTO → entity mapping (rename / normalize / narrow).
- **`HttpClient`** — HTTP outcome → typed `HttpError` (`200`→body, `5xx`→`server`, `4xx`→`client`, fetch-throw→`network`, bad JSON→`parse`).
- **`ProductsInteractor`** — combines products + page and propagates repository failures unchanged.
- **`resolveProductsError`** — `HttpError.type` → localized message (the UI error branching).
- **`usePagination`** — client-side pagination logic (`renderHook` + `act`, jsdom).
- **`ProjectList`** — the portfolio's main visual component: renders project titles + technology tags, and nothing when empty (RTL `render`, jsdom).

Together the error trio tells the full story: the client _classifies_ the failure, the interactor _propagates_ its type intact, and the resolver _maps_ it to copy. All follow **AAA** (`// Arrange / // Act / // Assert`) + **Gherkin** scenario names (`Given … / When … / Then …`); fixtures live in each feature's `data/mocks/`.

```bash
npm run test
```

## Conventions

Full frontend conventions (layers, naming, imports, `erasableSyntaxOnly`, typography variants, centralized i18n, mappers/use-case contracts, testing) are documented in [../CLAUDE.md](../CLAUDE.md). The phased plan is in [ROADMAP.md](ROADMAP.md).

## AI Usage

AI usage for the **whole project** (documented per exercise) lives in the
[root README](../README.md#ai-usage).
