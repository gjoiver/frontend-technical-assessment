# Personal Creative Portfolio

Monorepo del assessment front-end: un portafolio personal compuesto por un backend headless (Strapi) y una SPA (React) que lo consume.

## Estructura

```
.
├── backend/    # API headless con Strapi 5 (TypeScript, SQLite) — solo lectura pública
└── frontend/   # SPA con React 18 + Vite que consume la API (en construcción)
```

Cada carpeta es una app independiente con su propio `package.json`, se instala y se ejecuta por separado.

## Puesta en marcha

### Backend

```bash
cd backend
cp .env.example .env   # luego generar valores: openssl rand -base64 16
npm install
npm run develop        # http://localhost:1337  (admin en /admin, API en /api/portfolio)
```

Ver [backend/README.md](backend/README.md) para detalles, el modelo de contenido y la superficie de la API.

### Frontend

```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

> Pendiente de scaffolding.

## Documentación

- Guardrails y convenciones del backend: [CLAUDE.md](CLAUDE.md)
- Roadmap del backend: [ROADMAP.md](ROADMAP.md)
