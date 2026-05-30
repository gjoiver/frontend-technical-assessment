# Roadmap — Backend (Strapi 5)

API headless de solo lectura para el portafolio. Marca cada caja con `[x]`. Las casillas en **negrita** son los checkpoints de verificación: no avances sin cerrarlos.

> Estado: proyecto **TypeScript** con un único single type `portfolio`. El modelo de contenido está scaffoldeado; falta todo el comportamiento (populate, permisos, seed, CORS).

---

## 1. Scaffold y repo

- [x] 1.1 Scaffold de Strapi 5.47 (TypeScript)
- [x] 1.2 Crear usuario admin en `http://localhost:1337/admin`, luego detener el server (Ctrl+C)
- [x] 1.3 Revisar `.gitignore` (cubre `.env`, `.tmp`, `node_modules`, `dist`)
- [x] 1.4 Commitear el lockfile (`package-lock.json`)
- [x] 1.5 Commitear el modelo de contenido (`src/api/portfolio`, `src/components`) — aún sin commit

## 2. Componentes (modelo real)

- [x] 2.1 `portfolio.contact-info` (email, phone, socialMedia: json)
- [x] 2.2 `portfolio.project` (title req, description blocks, technologies: json)
- [x] 2.3 `portfolio.skill` (name req, level: enum Beginner/Intermediate/Advanced)
- [x] 2.4 `portfolio.seo` (metaTitle req, metaDescription req, keywords)
- [x] 2.5 `portfolio.experience` (title req, company req, duration, responsibilities blocks) — wireado como `experience` repetible

## 3. Content type

- [x] 3.1 Single type `Portfolio` (draft & publish ON) con: aboutMe (blocks), contactInformation, projects (dynamic zone de project), skills (repeatable), experience (repeatable), seo

> **Orden por dependencia:** la API primero tiene que **responder** (permisos), luego **tener algo que devolver** (contenido por panel), luego se le da **forma** a la respuesta (populate), y al final se abre el **acceso desde el navegador** (CORS). El **seed por código** se baja a pulido opcional (§10): solo aporta para el clon-limpio del evaluador, no para desarrollar/demostrar en tu máquina.

## 4. Acceso público (que la API responda)

- [x] 4.1 Bootstrap en `src/index.ts`: permiso público `find` para `api::portfolio.portfolio` (idempotente, sin write)
- [x] **4.2 Checkpoint:** `GET /api/portfolio` deja de dar `403` (devuelve 200, aunque aún sin poblar/contenido)

## 5. Datos vía panel (desbloquea el frontend)

- [ ] 5.1 Crear el contenido del portfolio en el **Content Manager** (aboutMe, contactInformation, ≥1 project, skills, experience, seo)
- [ ] 5.2 Dar **Publish** (con draft&publish, la API pública solo devuelve lo publicado)
- [ ] **5.3 Checkpoint:** `GET /api/portfolio` devuelve el contenido (campos planos visibles)

## 6. Forma de la respuesta (populate)

- [ ] 6.1 Override de `find` en el controller de `portfolio` para popular componentes + la dynamic zone `projects` por defecto (populate explícito, no `'*'`)
- [ ] **6.2 Checkpoint:** `GET /api/portfolio` ya trae `contactInformation`, `projects`, `skills`, `experience`, `seo` poblados

## 7. CORS (acceso desde el navegador)

- [ ] 7.1 CORS en `config/middlewares.ts` → `origin` desde env (default `http://localhost:5173`)

## 8. Reproducibilidad (clon limpio)

- [ ] 8.1 Verificar `.env.example` versionado (APP_KEYS, salts, ENCRYPTION_KEY, JWT_SECRET) + `CLIENT_URL`
- [ ] 8.2 Nota en README: `cp .env.example .env` + generar valores (`openssl rand -base64 16`)
- [ ] 8.3 README: documentar cómo poblar el contenido (vía panel, o seed si se implementa §10)

## 9. Verificación

- [ ] **9.1 Smoke test:**
  - `GET /api/portfolio` → 200 + componentes y `projects` poblados
  - `PUT/DELETE /api/portfolio` → 403/405 (público es solo lectura)
- [ ] 9.2 Commit: `feat: portfolio read-only API`

## 10. Seed por código (PULIDO OPCIONAL — solo si sobra tiempo)

> Beneficio: un clon limpio (`.tmp/data.db` borrado) levanta con contenido sin tocar el panel. Demuestra bootstrap idempotente + Document Service. No es requisito del assessment.

- [ ] 10.1 `src/seed/portfolio.ts`: contenido por defecto tipado (≥1 project, skills, contact, seo)
- [ ] 10.2 Bootstrap: si no existe portfolio, crear y publicar (`strapi.documents`, `status: 'published'`), idempotente
- [ ] 10.3 **Verificar clon limpio:** borrar `.tmp/data.db`, reiniciar, y el endpoint responde poblado sin tocar el panel

---

## Más adelante (cuando llegue el Ejercicio 2)

- [ ] Single type `Page` para el copy de la página de productos (title, intro)
- [ ] Permiso público `find` para `Page` en el bootstrap

---

**Nota de entrega:** la prueba pide _un_ repositorio con backend **y** frontend. Si dejas el back como repo aparte, antes de entregar conviene moverlo a un monorepo (`backend/` + `frontend/`) o tener claro cómo presentarás ambos. Decídelo pronto para evitar reorganizar al final.

**Transversal:** conventional commits y anota el uso de IA mientras avanzas (README `AI Usage`).
