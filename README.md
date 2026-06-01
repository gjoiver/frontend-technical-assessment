# Front-End Assessment

A monorepo solving a front-end technical assessment: a **Strapi** headless backend and a
**React 19** SPA that consumes it, plus two written exercises (architecture reasoning and an
AI-assisted refactor).

## What the assessment asked, and where it's solved

| #     | Requirement                                                                                                                                           | Where it's delivered                                                                                       |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **1** | **Portfolio** — read-only backend API + **responsive** SPA + **one unit test**                                                                        | [`backend/`](backend) (Strapi, read-only) + [`frontend/`](frontend) (`portfolio` feature); Vitest tests    |
| **2** | **Products** — consume `fakestoreapi`, a fetch service, **detailed error handling (5xx / 4xx / network)**, a list page using Strapi for the page copy | [`frontend/`](frontend) `products` feature — typed `HttpError` + per-type messages, tested                 |
| **3** | **Architecture reasoning** — scalable front-end with **microfrontends + DevOps**                                                                      | [`microfrontend-architecture-reasoning/`](microfrontend-architecture-reasoning/exercise-3-architecture.md) |
| **4** | **AI-assisted refactoring** — clean, production-ready code + prompts + final version                                                                  | [`ai-assisted-refactoring/`](ai-assisted-refactoring/README.md)                                            |
| ✓     | **Document AI usage**                                                                                                                                 | "AI Usage" sections in each README + prompt transcripts in the exercise docs                               |
| ✓     | **Runs from a clean clone**                                                                                                                           | backend **seeds content automatically** on first boot; `.env.example` committed                            |

> Quality criteria (responsive / mobile-first, clean-code, clean architecture) are detailed in
> [frontend/README.md](frontend/README.md).

## Technical highlights

The standout pieces across the whole project — each links to where it lives.

**Architecture & data**

- **Clean Architecture** per feature (`core` / `data` / `presentation`) with **Repository · Interactor · DI** wired at a composition root ([`app/di`](frontend/src/app/di)).
- **DTO→entity mappers** (a shared `Mapper` base) keeping the API's wire shape out of the UI.

**HTTP & error handling**

- **Typed `HttpError` with four failure classes** — `network` / `server` / `client` / `parse` — classified once in the injected [`HttpClient`](frontend/src/shared/lib/http) and branched into localized copy by [`resolveProductsError`](frontend/src/features/products/presentation/i18n).
- **Two independent `HttpClient`s**, one per origin (Strapi + Fake Store), composed at the root.

**Design system & UI**

- **Typed design tokens** as the single source of truth ([`shared/ui/theme`](frontend/src/shared/ui/theme)), governed by the brand manual ([BRAND.md](BRAND.md)); **Atomic Design** + styled-components.
- **Motion system honoring `prefers-reduced-motion`** everywhere (animated hero, scroll-reveal, skill meters, micro-interactions).
- **Reusable `shared/` kernel** — `Skeleton`, `Reveal`, `TechIcon`, `Pagination` (dynamic), `EmptyState`, `ErrorState`, `useClipboard`, `useScrollSpy`, `useReveal` …
- **Strapi blocks dependency isolated to a single [`RichTextRenderer`](frontend/src/shared/ui/molecules/RichTextRenderer)** — nothing else imports the CMS renderer.
- **SEO via React 19 native metadata** (no library) · **skeleton & empty states** · **actionable contact** (`tel:` / `mailto:` / copy) · **WCAG AA** accessibility.
- **Centralized i18n per feature** — no hardcoded UI strings.

**Backend**

- **Idempotent `seed` on bootstrap** ([`src/seed`](backend/src/seed), `portfolio` + `page`) — a clean clone serves real content with **no admin step**.
- Read-only public API: **auto-granted `find` permissions** + **controller-level populate** (explicit, not `'*'`) · v5 **Document Service API** · env-locked CORS.
- **Dependency-audit risk reviewed and documented** ([SECURITY.md](backend/SECURITY.md)).

**Testing**

- **6 suites / 22 tests** though only **one** was required — **AAA + Gherkin**, fixtures in `data/mocks/`, RTL hook + component tests — targeting the hard-to-reproduce error paths (HTTP classification, propagation, branching). Rationale in [frontend/README.md](frontend/README.md).

**Exercises 3 & 4**

- **Architecture reasoning** built **decision-by-decision** as **ADRs** with **Mermaid diagrams**: Module Federation shell, **BFF + httpOnly** security, observability, a **CI/CD pipeline with an AI code-review stage**, and an honest "when *not* to use microfrontends" → [exercise-3](microfrontend-architecture-reasoning/exercise-3-architecture.md).
- **AI refactoring**: a throwaway `fetch` snippet rebuilt into **production-ready TypeScript** (typed, real error handling, `cause` chaining), **runnable** (`npm start`) → [exercise-4](ai-assisted-refactoring/README.md).

Throughout: **conventional commits**, **strict TypeScript** (`erasableSyntaxOnly`), per-app roadmaps, and shared conventions in [CLAUDE.md](CLAUDE.md).

Conventional commits and strict TypeScript (`erasableSyntaxOnly`) throughout.

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
