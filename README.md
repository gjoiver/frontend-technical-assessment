# Personal Creative Portfolio — Front-End Assessment

A monorepo solving a front-end technical assessment: a **Strapi** headless backend and a
**React 19** SPA that consumes it, plus two written exercises (architecture reasoning and an
AI-assisted refactor).

## What the assessment asked, and where it's solved

| # | Requirement | Where it's delivered |
|---|---|---|
| **1** | **Portfolio** — read-only backend API + **responsive** SPA + **one unit test** | [`backend/`](backend) (Strapi, read-only) + [`frontend/`](frontend) (`portfolio` feature); Vitest tests |
| **2** | **Products** — consume `fakestoreapi`, a fetch service, **detailed error handling (5xx / 4xx / network)**, a list page using Strapi for the page copy | [`frontend/`](frontend) `products` feature — typed `HttpError` + per-type messages, tested |
| **3** | **Architecture reasoning** — scalable front-end with **microfrontends + DevOps** | [`microfrontend-architecture-reasoning/`](microfrontend-architecture-reasoning/exercise-3-architecture.md) |
| **4** | **AI-assisted refactoring** — clean, production-ready code + prompts + final version | [`ai-assisted-refactoring/`](ai-assisted-refactoring/README.md) |
| ✓ | **Document AI usage** | "AI Usage" sections in each README + prompt transcripts in the exercise docs |
| ✓ | **Runs from a clean clone** | backend **seeds content automatically** on first boot; `.env.example` committed |

> Quality criteria (responsive / mobile-first, clean-code, clean architecture) are detailed in
> [frontend/README.md](frontend/README.md).

## Highlights

**Exercise 1 — Portfolio**

- **Backend:** read-only Strapi 5 API with **idempotent self-seeding on bootstrap** (a clean clone serves real content with **no admin step**), controller-level populate (stable contract), v5 Document Service, env-locked CORS.
- **Frontend architecture:** Clean Architecture per feature (`core` / `data` / `presentation`) + **Repository + Interactor** + DI at a composition root; DTO→entity mappers; a reusable **`shared/` design-system kernel** (atoms, molecules, hooks, injected `HttpClient`).
- **Own design system:** **design tokens** as the single source of truth, dark theme + violet→indigo gradient, Atomic Design — governed by the **brand manual** ([BRAND.md](BRAND.md)).
- **Visual craft:** animated hero (aurora + shimmer + CTAs), scroll-reveal, skill-level meters, tech brand icons, **actionable contact** (tap-to-call / `mailto:` / copy), experience timeline, sticky header with **scroll-progress + active-section** highlight, skeletons & empty states, **SEO** via React 19 metadata — all **responsive (mobile-first)**, **WCAG AA**, `prefers-reduced-motion`-aware.

**Exercise 2 — Products**

- External **`fakestoreapi`** integration + the page copy from Strapi, loaded together in one use case.
- **Detailed error handling by class** (5xx / 4xx / network / parse) via a typed **`HttpError`** mapped to friendly, localized messages.
- **Dynamic client-side pagination** (page-size options adapt to the total), reusing the shared `Pagination` / `EmptyState` / skeletons.

**Exercise 3 — Architecture reasoning (microfrontends + DevOps)**

- Built **decision-by-decision** (Socratic) and recorded as **ADRs**, with **Mermaid diagrams** (topology + pipeline).
- Module Federation (runtime) + a client-side app shell; security via **BFF + httpOnly**, CSP/Trusted Types and trust-based isolation; resilience (bulkheads) + OpenTelemetry observability.
- A **CI/CD pipeline** with quality & security gates — **including an AI code-review stage** that reviews each PR against the project's own conventions — plus an honest "when *not* to use microfrontends".

**Exercise 4 — AI-assisted refactoring**

- A messy `fetch` helper refactored to **production-ready TypeScript** (typed input/output, `async/await`, honest error handling with `cause` chaining), **runnable from the repo** (`npm start`), with the prompts documented.

**Across the project**

- **Testing — 6 suites / 22 tests** (Vitest + React Testing Library): more than the one required, focused on the **hard-to-reproduce error paths** (HTTP classification, propagation, branching).
- **Conventional commits**, **strict TypeScript** (`erasableSyntaxOnly`), a documented **dependency-audit risk** ([backend/SECURITY.md](backend/SECURITY.md)), and shared conventions in [CLAUDE.md](CLAUDE.md).

## Run it

**Two terminals.** Backend first, then frontend.

```bash
# 1) Backend  →  http://localhost:1337
cd backend
cp .env.example .env          # then generate secrets: openssl rand -base64 16
npm install
npm run develop               # seeds & publishes content automatically (no admin step)

# 2) Frontend  →  http://localhost:5174
cd frontend
cp .env.example .env          # VITE_API_URL points at the backend (localhost:1337)
npm install
npm run dev
```

Open **http://localhost:5174** — `/` is the portfolio, `/products` is the products page. The dev
server is pinned to **5174** (the backend's allowed CORS origin), so keep the backend running.

> **Exercise 4** runs on its own: `cd ai-assisted-refactoring && npm install && npm start`.

## Repository map

```
.
├── backend/                            # Strapi 5 · TypeScript · SQLite — public read-only API
├── frontend/                           # React 19 · Vite · styled-components SPA
├── microfrontend-architecture-reasoning/   # Exercise 3 — architecture decisions + diagrams
└── ai-assisted-refactoring/            # Exercise 4 — refactored getUser + prompts
```

## AI Usage

Built **AI-assisted** (Claude / Claude Code): the AI proposed options, trade-offs and risks; the
**human made every decision**. Each exercise documents AI usage **as its own brief requires**.

### Exercise 1 — Portfolio

> _Requirement: "Explain how AI contributed to your solution."_

AI contributed across the whole build: it **planned the work**, proposed the page **structure**, and
generated the code — reviewed and approved by the human — for a portfolio that **loads a person's
profile from the CMS and shows it responsively**, with clear **loading and error** states. It also
**surfaced the edge cases** (missing/empty data, over-long text collapsed behind "show more") and
wrote the **automated test**.

### Exercise 2 — Products

> _Requirement: "Document AI assistance in the design of the solution."_

AI assisted mainly in the **design**, before any code: it analysed the **happy path, edge cases and
failure modes**; proposed loading the **product list and the page's intro text together**; designed
the **per-failure messaging** (server down / not found / no connection / unexpected response); and
shaped the **user-controlled pagination**. The human chose each design option.

### Exercise 3 — Architecture reasoning

> _Requirement: "A screenshot or textual transcription of the AI prompts used."_

The full prompt transcription is part of that deliverable →
[microfrontend-architecture-reasoning/exercise-3-architecture.md](microfrontend-architecture-reasoning/exercise-3-architecture.md).

### Exercise 4 — AI-assisted refactoring

> _Requirement: "Explain which prompts were used."_

The prompts and what each produced are documented with the code →
[ai-assisted-refactoring/README.md](ai-assisted-refactoring/README.md).

### Enhancements (beyond the brief)

AI also helped polish past the requirements: a more attractive UI, **SEO**, **loading & empty
states**, safer configuration, **more tests** for the hard-to-reproduce failures, and a documented
**security** review — while flagging what would **exceed the scope** (Docker/CI, auth, an i18n
library, E2E) so it was intentionally skipped.

## Documentation

- **Backend:** [backend/README.md](backend/README.md) · security notes: [backend/SECURITY.md](backend/SECURITY.md)
- **Frontend:** [frontend/README.md](frontend/README.md) (architecture, testing)
- **Brand manual** (colors, type, components, voice): [BRAND.md](BRAND.md)
- **Exercise 3** — architecture reasoning: [microfrontend-architecture-reasoning/](microfrontend-architecture-reasoning/exercise-3-architecture.md)
- **Exercise 4** — AI-assisted refactor: [ai-assisted-refactoring/README.md](ai-assisted-refactoring/README.md)
- Working conventions (backend + frontend): [CLAUDE.md](CLAUDE.md)
