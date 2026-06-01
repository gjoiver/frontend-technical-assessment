# Roadmap — Definición de arquitectura (Ejercicio 3)

Cómo **definimos** la arquitectura de microfrontends + DevOps, paso a paso y **en orden de
dependencia**. No se "asumen" decisiones: cada fase es una **decisión** que se **deriva** de
sus fuerzas mediante **preguntas socráticas**, y se cierra como un **ADR** (Architecture
Decision Record).

> **Método (enfoque socrático, perspectiva de arquitecto senior):** en cada paso, *antes* de
> decidir, respondemos las preguntas guía. La decisión cae sola cuando las fuerzas están sobre
> la mesa. Cada **checkpoint en negrita** = un ADR registrado (one-liner: contexto · decisión ·
> consecuencias).
>
> **Transversales que atraviesan TODA fase** (se evalúan explícitamente en cada decisión):
> **scalability · maintainability · performance · security**.
>
> El análisis previo (open loops / happy path / edge cases / errors) vive en
> [exercise-3-architecture.md §1](exercise-3-architecture.md); este roadmap es el **proceso**
> para resolverlo. La salida de ejecutar el roadmap es ese documento, validado decisión a
> decisión.

---

## Fase 0 — Marco y criterios (¿por qué y para qué?)

Fijar el problema y los criterios de éxito **antes** de cualquier tecnología.

**Preguntas socráticas**
- ¿Qué problema *real* resolvemos con MFE: escalar equipos, despliegues independientes, aislar
  dominios… o en realidad es performance/SEO (otro problema, otra solución)?
- ¿Cuántos equipos —y de qué tamaño— tocarán este front en 12–18 meses?
- ¿Qué duele hoy que un **monolito modular bien hecho** (lo que ya tenemos) no resuelva?
- ¿Cuáles son los NFR **medibles** (LCP, INP, TTFB, error rate, MTTR, lead time)?

- [x] 0.1 Drivers y criterios de éxito (NFR medibles: DORA + CWV + fitness)
- [x] 0.2 Premisa y **contexto representativo genérico** (org ~5–8 equipos, dominios A/B/C; MFE es premisa del enunciado)
- [x] **0.3 ADR-000: contexto y criterios de éxito**

## Fase 1 — Decomposición (¿dónde cortamos?)

**Preguntas socráticas**
- ¿Por qué eje cortamos: **capacidad de negocio (vertical)** o capa técnica (horizontal)? ¿Qué
  implica la **Ley de Conway** / team topology?
- ¿Qué tan independientes son los dominios? ¿Comparten datos/estado críticos?
- Un cambio *típico*, ¿toca un solo slice o varios? (si toca varios, el corte está mal)

- [x] 1.1 Mapear dominios → candidatos a MFE (shell + un MFE por dominio A/B/C…)
- [x] 1.2 Ownership por equipo (un equipo stream-aligned por dominio)
- [x] **1.3 ADR-001: decomposición vertical por capacidad de negocio; shell + design system compartido**

## Fase 2 — Estrategia de integración (¿cómo se unen?)

**Preguntas socráticas**
- ¿Necesitamos despliegue independiente **en runtime**, o basta integración **build-time**?
- ¿La org es **single-framework** o multi? (decide Module Federation vs Native Federation vs Web Components)
- ¿Cuánto vale compartir dependencias (**un solo React**) frente a aislamiento total?

- [x] 2.1 Runtime vs build-time → **runtime**
- [x] 2.2 Mecanismo → **Module Federation** (single-framework; Native Federation como ruta políglota)
- [x] **2.3 ADR-002: estrategia de integración**

## Fase 3 — Composición y rendering (¿quién orquesta, dónde renderiza?)

**Preguntas socráticas**
- ¿Un **app shell en cliente (CSR)** basta, o el TTFB/SEO exige **SSR/edge**?
- ¿Quién posee el shell y cuál es su responsabilidad **mínima**?
- ¿Cuál es el **disparador explícito** para migrar a SSR (no "algún día")?

- [x] 3.1 CSR shell vs SSR/edge → **CSR**, con SSR selectivo como trigger
- [x] 3.2 Responsabilidades del shell (layout · routing top-level · auth · registry · singletons · boundaries)
- [x] **3.3 ADR-003: modelo de composición**

## Fase 4 — Contratos y concerns compartidos (¿cómo cooperan sin acoplarse?)

Cada sub-decisión se resuelve socráticamente.

**Preguntas socráticas**
- **Routing:** ¿shell (top-level) vs remote (sub-rutas)? ¿deep links e historial?
- **Comunicación/estado:** ¿event bus / contexto / store? ¿qué pasa si dos MFE necesitan el
  mismo dato? (¿cuál es el dueño?)
- **Design system:** ¿paquete versionado o remote? ¿cómo evitas **N versiones divergentes**?
- **Versionado:** ¿semver + contract tests bastan, o hace falta **chequeo en runtime**?

- [x] 4.1 Routing ownership → shell top-level + MFE sub-rutas, router singleton
- [x] 4.2 Comunicación entre MFEs → URL + contexto del shell + **event bus tipado**, sin store global
- [x] 4.3 Design system compartido + governance → librería versionada singleton, semver + deprecación N-1
- [x] 4.4 Contratos + versionado → contracts package + semver + contract tests + **runtime version check**
- [x] **4.5 ADR-004…007 registradas**

## Fase 5 — Seguridad y modelo de confianza

**Preguntas socráticas**
- Si todos los remotes comparten **un origen**, ¿cuál es el *blast radius* de un XSS? ¿qué lo contiene?
- ¿Dónde vive el **token**? Si hay XSS, ¿lo roban? ¿qué reduce esa probabilidad/ventana?
- ¿Hay remotes **no confiables** (terceros)? ¿los aíslas en iframe (frontera real)?
- ¿Cómo verificas la **integridad del `remoteEntry`** (supply chain)?

- [ ] 5.1 Trust model + aislamiento (CSP/Trusted Types; iframe para no confiables)
- [ ] 5.2 Auth/sesión (dónde vive el token, refresh, propagación scoped)
- [ ] 5.3 Supply chain (integridad/pinning, SCA/SBOM/firma)
- [ ] **5.4 ADR-008: modelo de seguridad**

## Fase 6 — Resiliencia y observabilidad

**Preguntas socráticas**
- Si un remote no carga o lanza, ¿qué ve el usuario? ¿se cae **todo** o degrada?
- En prod, ¿cómo sabes **de qué MFE** vino un error?
- ¿Cómo **detectas y revertís** un deploy malo, y en cuánto tiempo (MTTR)?

- [ ] 6.1 Aislamiento de fallos (error boundaries, fallback, timeout, bulkheads)
- [ ] 6.2 Observabilidad (tagging por MFE, correlation-id, RUM/error tracking)
- [ ] 6.3 Estrategia de rollback (re-pin del manifest)
- [ ] **6.4 ADR-009: resiliencia y observabilidad**

## Fase 7 — Entrega (CI/CD)

**Preguntas socráticas**
- ¿Pipeline **por MFE** o global? ¿qué dispara qué (push/PR, affected-only)?
- ¿Qué **gates** bloquean un merge (cobertura de código nuevo, Sonar, security, AI review)?
- ¿Cómo manejas **ambientes, secretos y permisos** (OIDC, RBAC, aprobaciones)?
- ¿**Build-once-promote** o rebuild por ambiente?

- [ ] 7.1 Triggers + affected-only
- [ ] 7.2 Quality & security gates
- [ ] 7.3 Fase de AI code review
- [ ] 7.4 Ambientes + access control
- [ ] 7.5 Progressive delivery (canary, flags) + rollback
- [ ] **7.6 ADR-010: pipeline de entrega**

## Fase 8 — Performance y escalado

**Preguntas socráticas**
- ¿Cuál es el **costo en runtime** de Module Federation y cómo lo mitigas?
- ¿Qué **budgets** pones y **dónde los haces fallar** (CI)?
- ¿Cuál es el **trigger** para pasar de mono→poly y de CSR→SSR?

- [ ] 8.1 Singletons + lazy/prefetch + budgets
- [ ] 8.2 Caching/CDN
- [ ] 8.3 Triggers de escalado (mono→poly, CSR→SSR)
- [ ] **8.4 ADR-011: performance y escalado**

## Fase 9 — Gobierno y validación

**Preguntas socráticas**
- ¿Cómo evitas la **entropía** con N equipos (divergencia de UI/patrones)?
- ¿Cómo "**pruebas**" que la arquitectura se sostiene (*fitness functions*)?
- ¿**Cuándo NO** usar MFE? (saber el límite es parte del diseño)

- [ ] 9.1 Consolidar ADRs
- [ ] 9.2 Fitness functions (bundle budget, reglas de dependencia, contract tests en CI)
- [ ] 9.3 Sección "cuándo no usar MFE"
- [ ] **9.4 Checkpoint: `exercise-3-architecture.md` validado decisión a decisión contra este roadmap**

---

**Nota:** las decisiones que ya esbozamos (Module Federation runtime, CSR shell, event bus
tipado, token en memoria + CSP, contract tests + runtime check) **no se dan por hechas**: se
**re-derivan** al ejecutar las fases y, si una pregunta socrática las contradice, se cambian.
El documento de arquitectura se actualiza al cerrar cada ADR.
