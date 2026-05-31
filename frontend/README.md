# Frontend — Personal Creative Portfolio (React SPA)

A React SPA with two features — a **portfolio** (consuming the Strapi API) and a **products** catalog (consuming the external [Fake Store API](https://fakestoreapi.com) plus Strapi page copy) — rendered as **responsive, mobile-first** pages. Built with **Clean Architecture**, **Atomic Design** and a **Repository + Interactor** pattern.

## Stack

- **React 19** · **Vite** · **TypeScript**
- **styled-components** v6 (theming + design tokens)
- **react-router-dom** v7
- **react-icons** (UI + brand icons)
- **@strapi/blocks-react-renderer** (Strapi rich-text blocks)
- **Vitest** (unit tests)

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

**Vitest**, reusing the Vite config (path aliases work with no extra setup). Four suites, each targeting a **single responsibility** — pure units with mocked collaborators:

- **`PortfolioMapper`** — DTO → entity mapping (rename / normalize / narrow).
- **`HttpClient`** — HTTP outcome → typed `HttpError` (`200`→body, `5xx`→`server`, `4xx`→`client`, fetch-throw→`network`, bad JSON→`parse`).
- **`ProductsInteractor`** — combines products + page and propagates repository failures unchanged.
- **`resolveProductsError`** — `HttpError.type` → localized message (the UI error branching).

Together the last three tell the full error story: the client _classifies_ the failure, the interactor _propagates_ its type intact, and the resolver _maps_ it to copy. All follow **AAA** (`// Arrange / // Act / // Assert`) + **Gherkin** scenario names (`Given … / When … / Then …`); fixtures live in each feature's `data/mocks/`.

```bash
npm run test
```

## Conventions

Full frontend conventions (layers, naming, imports, `erasableSyntaxOnly`, typography variants, centralized i18n, mappers/use-case contracts, testing) are documented in [../CLAUDE.md](../CLAUDE.md). The phased plan is in [ROADMAP.md](ROADMAP.md).

## AI Usage

This SPA was built with AI assistance (Claude) in a step-by-step, phase-by-phase flow.

- **Surfacing open loops.** AI was asked to review the repo and flag the project's open loops — loose ends and inconsistencies, e.g. docs that had drifted from the actual code, missing barrel exports, and a frontend/backend **port + CORS** mismatch — so they were closed deliberately instead of left dangling.
- **Validating happy paths, edge cases and errors.** Behavior was checked against the three: the **happy path** (a fully populated portfolio), **edge cases** (null/empty collections normalized to `[]`/`undefined`, an invalid skill level narrowed away, empty sections hidden, long text collapsed behind "show more"), and **errors** (a typed `HttpError` with `network | server | client | parse` types plus the page's loading/error states). The unit test on `PortfolioMapper` encodes the happy + edge cases.
- **Technical decisions, reasoned before coding.** Trade-offs were discussed and justified rather than assumed — the **DTO/mapper boundary** vs. shaping the response in the backend; **where to wire dependencies** (interactor building its use cases from injected ports vs. the composition root); wrapping the **official blocks renderer** to contain the Strapi coupling; **alias-vs-relative** imports; **`Text` typography variants** over raw `as`; **centralized i18n**; and dropping over-engineering where it added no value.
- **Architecture applied incrementally** (shared kernel → core → data → presentation → composition root), checkpointed in `ROADMAP.md`, with a **code review per phase**; conventions were captured in `../CLAUDE.md` as they emerged.

### Exercise 2 — products integration

- **Open loops.** AI surfaced the E2-specific loose ends before they bit: a Strapi `intro` field that turned out to be **plain text, not blocks** (rendering it through `RichTextRenderer` crashed with `props.content.map is not a function`); the **StrictMode double-fetch** in dev (explained as expected behavior, gone in a production build — not a bug); and **hardcoded nav labels** in the app shell (moved to a co-located `AppLayout.config.ts`).
- **Happy path / edge cases / errors.** _Happy:_ products + page copy load together via **one combined use case** (`Promise.all`). _Edge:_ **client-side pagination** (10/20/50 per page, "Página X de Y") since the API returns everything at once, and equal-height cards that keep the price **pinned bottom-left** regardless of title length. _Errors:_ the **5xx / 4xx / network / parse** branching lives in the `httpClient` and is surfaced as localized copy via `resolveProductsError` — both under unit test.
- **Technical decisions, reasoned before coding.** Combined load (one use case) vs. two independent fetches; a **reusable `formatCurrency`** (`Intl.NumberFormat`) over ad-hoc string formatting; **testing the branching where it lives** (client classifies, interactor propagates, resolver maps) instead of from the interactor alone; and promoting **`RichTextRenderer` + pagination** to `shared/ui` for reuse across features.
