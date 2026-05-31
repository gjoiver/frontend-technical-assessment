# Roadmap — Frontend (React SPA)

SPA que consume la API de Strapi (Ejercicio 1) y, más adelante, `fakestoreapi` (Ejercicio 2).
Marca cada caja con `[x]`. Las casillas en **negrita** son checkpoints de verificación.

> **Criterios del assessment que guían este plan:**
>
> - Fully responsive (mobile-first).
> - Clean-code y best architecture practices.
> - Component structure + styling + **un** unit test.
>
> **Arquitectura requerida:** Atomic Design · Clean Code · SOLID · Clean Architecture por capas (core / data / presentation) · división por **features** · carpeta `shared` (núcleo de dependencias) en la raíz · patrón **Repository + Interactor** · **Rules of React** (https://react.dev/reference/rules). Tests con patrón **AAA** y escritura estilo **Gherkin** (Given/When/Then).

---

## 0. Decisiones de arquitectura (resumen)

- **Capas (Clean Architecture)** dentro de cada feature, con la dependencia apuntando hacia adentro:
  - `core` → dominio puro: entidades, _puertos_ (interfaces de repositorio), **use cases / interactors**. No conoce React ni HTTP.
  - `data` → implementa los puertos del `core`: datasources (HTTP), DTOs + mappers, implementación de repositorios.
  - `presentation` → React: páginas, componentes (atomic), hooks. Depende de `core` (entidades/use cases), nunca de `data` directo.
- **Patrón Repository + Interactor** (cadena de consumo desde el front):

  ```
  PortfolioPage → usePortfolio (hook) → PortfolioInteractor (facade)
                → GetPortfolioUseCase → PortfolioRepository (puerto)
                → PortfolioRepositoryImpl → StrapiPortfolioDataSource → httpClient
  ```

  - **Interactor** = facade **per-feature** (`PortfolioInteractor` en `core/interactors/`) que la presentación consume. Expone métodos de la feature (`getPortfolio()`) y **delega cada uno en un use case**. No conoce HTTP ni `data`.
  - **Use case** = `‹Acción›‹Entidad›UseCase`, una unidad de lógica de aplicación que depende del **puerto**.
  - **Repository** = puerto (interfaz) en `core` + implementación en `data`. Aísla el origen de datos.

- **Convención de nombres:** use cases `‹Acción›‹Entidad›UseCase` (p. ej. `GetPortfolioUseCase`).
- **Features** = slices verticales: `portfolio` (Ej. 1) y `products` (Ej. 2, después). Cada uno con sus 3 capas.
- **`shared/`** (raíz de `src`) = núcleo transversal: design system (atomic), cliente HTTP, config, theme, tipos/utilidades comunes.
- **Atomic Design** vive en presentación y `shared/ui`: atoms → molecules → organisms → templates → pages.
- **Inversión de dependencias (SOLID-D):** la presentación recibe el interactor ya cableado en el _composition root_ (`app/`); no instancia `data` por su cuenta.
- **Rules of React:** componentes y hooks **puros** (sin efectos secundarios en el render), idempotentes; props/state **inmutables** (no mutar); efectos secundarios (fetch) solo en efectos/manejadores; respetar las **Rules of Hooks** (llamadas en el top level). Ref.: https://react.dev/reference/rules

### Estructura objetivo

```
frontend/
  src/
    app/                          # composition root: router, providers, wiring (DI)
      App.tsx
      router.tsx
      providers/
    shared/                       # núcleo transversal (dependencias core compartidas)
      ui/                         # design system (atomic, genérico y reutilizable)
        atoms/                    # Button, Text, Icon, Spinner, Tag...
        molecules/                # Card, Field, SectionTitle...
        theme/                    # tokens, theme styled-components, GlobalStyle, breakpoints
      lib/
        http/                     # httpClient (wrapper fetch) + manejo de errores
        config/                   # env (VITE_API_URL), constantes
      types/                      # tipos/utilidades comunes
      utils/
    features/
      portfolio/
        core/
          entities/               # Portfolio, Project, Skill, Experience, Contact, Seo
          repositories/           # PortfolioRepository (puerto/interfaz)
          usecases/               # GetPortfolioUseCase (interactor)
        data/
          datasources/            # StrapiPortfolioDataSource
          dto/                    # PortfolioDto + mapper DTO→entidad
          repositories/           # PortfolioRepositoryImpl
        presentation/
          pages/                  # PortfolioPage
          components/             # organisms por sección: AboutSection, ProjectList, SkillGrid, ExperienceList, ContactCard
          hooks/                  # usePortfolio (loading/error/data)
      products/                   # (Ejercicio 2 — misma forma, más adelante)
    main.tsx
  index.html
  vite.config.ts
  package.json
```

> **Nota de proporción:** `portfolio` hace **una** llamada (`/api/portfolio`) y devuelve **un** agregado. Por eso es **una** feature con secciones como organisms, no cinco features. Mantener las capas, sin fragmentar de más.

---

## 1. Scaffold y tooling

- [x] 1.1 Scaffold Vite + React 19 + TypeScript en `frontend/` (`npm create vite@latest . -- --template react-ts`)
- [x] 1.2 Instalar deps de UI: `styled-components` (+ tipos si aplica)
- [x] 1.3 Instalar router: `react-router-dom`
- [x] ~~1.4 Mover deps de `backend/package.json`~~ — **N/A**: las deps react/styled-components del backend son del **admin de Strapi** (las necesita `strapi build`); el frontend tiene su propio `package.json`. No se mueve nada.
- [x] 1.5 Configurar **path aliases** (`@/`, `@shared`, `@features`) en `vite.config.ts` + `tsconfig`
- [ ] 1.6 ESLint + Prettier (clean code) — opcional si Vite no los trae ya
- [x] 1.7 `.env` del front: `VITE_API_URL=http://localhost:1337` (+ `.env.example`)
- [x] **1.8 Checkpoint:** `npm run dev` levanta en `http://localhost:5174`

## 2. Shared kernel

- [x] 2.1 `shared/ui/theme`: tokens (colores, espaciado, tipografía), `breakpoints` (mobile-first), `GlobalStyle`, `ThemeProvider`
- [x] 2.2 `shared/lib/config`: leer `VITE_API_URL`
- [x] 2.3 `shared/lib/http`: `httpClient` (wrapper de `fetch`) con manejo de errores tipado (reutilizable por Ej. 2)
- [x] 2.4 `shared/ui/atoms`: empezar los átomos base (Text, Button, Tag, Spinner)
- [x] 2.5 `shared/ui/molecules`: Card, SectionTitle

## 3. Feature `portfolio` — capa `core` (dominio)

- [x] 3.1 `entities/`: tipos de dominio (Portfolio, Project, Skill, Experience, Contact, Seo) — independientes de la forma de Strapi
- [x] 3.2 `repositories/PortfolioRepository.ts`: interfaz (puerto) `getPortfolio(): Promise<Portfolio>`
- [x] 3.3 `usecases/GetPortfolioUseCase.ts`: use case con `execute(): Promise<Portfolio>`, depende del puerto (no de la implementación)
- [x] 3.4 `interactors/PortfolioInteractor.ts`: facade per-feature que expone `getPortfolio()` y delega en el use case

## 4. Feature `portfolio` — capa `data`

- [x] 4.1 `dto/PortfolioDto.ts`: forma cruda de la respuesta de Strapi (`{ data: {...} }`)
- [x] 4.2 `dto/portfolioMapper.ts`: DTO → entidad de dominio (aísla a la UI de cambios en la API)
- [x] 4.3 `datasources/StrapiPortfolioDataSource.ts`: usa `httpClient` para `GET /api/portfolio`
- [x] 4.4 `repositories/PortfolioRepositoryImpl.ts`: implementa el puerto usando datasource + mapper

## 5. Feature `portfolio` — capa `presentation`

- [x] 5.1 `hooks/usePortfolio.ts`: ejecuta `GetPortfolioUseCase`, expone `{ data, loading, error }` (fetch en efecto; hook **puro**, sin mutaciones)
- [x]5.2 Organisms por sección (atomic): `AboutSection`, `ProjectList`, `SkillGrid`, `ExperienceList`, `ContactCard`
- [x] 5.3 `pages/PortfolioPage.tsx`: compone las secciones (template) + estados loading/error
- [x]5.4 Render de campos _blocks_ de Strapi (`aboutMe`, `description`, `responsibilities`) — helper de render
- [x] **5.5 Checkpoint Rules of React:** componentes/hooks puros e idempotentes, sin mutar props/state, efectos solo para sincronizar (https://react.dev/reference/rules)

## 6. Composition root (`app/`)

- [x] 6.1 Cablear dependencias (DI manual): `httpClient` → `DataSource` → `RepositoryImpl` → `GetPortfolioUseCase` → `usePortfolio`
- [x] 6.2 `router.tsx`: ruta `/` → `PortfolioPage`
- [x] 6.3 `providers/`: `ThemeProvider` + `GlobalStyle`
- [x] **6.4 Checkpoint:** la página muestra el contenido real traído de Strapi

## 7. Responsive y styling (mobile-first)

- [x] 7.1 Layout mobile-first: estilos base = móvil; `min-width` media queries para escalar
- [x] 7.2 Grids responsive (skills/projects) con CSS Grid/Flex
- [x] 7.3 Navegación/header responsive
- [x] **7.4 Checkpoint:** revisar en 320px, 768px, 1024px+ sin overflow ni roturas

## 8. Testing (un unit test — AAA + Gherkin)

- [ ] 8.1 Configurar **Vitest** + **React Testing Library** + jsdom
- [ ] 8.2 Escribir **un** unit test con:
  - **AAA**: bloques Arrange / Act / Assert claros.
  - **Gherkin**: `describe('Feature: …')` + `it('Scenario: given…, when…, then…')` (o comentarios Given/When/Then).
  - Candidato recomendado: `GetPortfolioUseCase` con un `PortfolioRepository` mock (lógica pura, determinista, demuestra la testabilidad del patrón interactor). Alternativa: `portfolioMapper` o un componente con RTL.
- [ ] **8.3 Checkpoint:** `npm run test` pasa en verde

## 9. Cierre

- [ ] 9.1 README del frontend (instalación, arquitectura, scripts, decisiones, AI Usage) — en inglés
- [ ] 9.2 Actualizar el README raíz (sección frontend)
- [ ] 9.3 Commit: `feat(frontend): portfolio SPA with clean architecture + atomic design`

---

## Más adelante (Ejercicio 2)

- [ ] Feature `products`: consumir `https://fakestoreapi.com/products` reutilizando `shared/lib/http`
- [ ] Manejo de errores detallado (5xx, 4xx, red)
- [ ] Página simple listando títulos de productos + copy desde Strapi (single type `Page`)

**Transversal:** conventional commits y anotar el uso de IA mientras avanzas.
