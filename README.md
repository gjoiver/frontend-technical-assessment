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

## Documentation

- **Backend:** [backend/README.md](backend/README.md) · security notes: [backend/SECURITY.md](backend/SECURITY.md)
- **Frontend:** [frontend/README.md](frontend/README.md) (architecture, testing, AI usage)
- **Brand manual** (colors, type, components, voice): [BRAND.md](BRAND.md)
- **Exercise 3** — architecture reasoning: [microfrontend-architecture-reasoning/](microfrontend-architecture-reasoning/exercise-3-architecture.md)
- **Exercise 4** — AI-assisted refactor: [ai-assisted-refactoring/README.md](ai-assisted-refactoring/README.md)
- Working conventions (backend + frontend): [CLAUDE.md](CLAUDE.md)
