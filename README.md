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
