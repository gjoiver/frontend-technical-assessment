# Exercise 3 — Architecture Reasoning (AI-assisted)

> **Standalone design exercise:** a **scalable front-end architecture using microfrontends and
> DevOps practices** (scalability, maintainability, performance, security).
>
> It is built **decision by decision** following [exercise-3-roadmap.md](exercise-3-roadmap.md):
> each decision is derived Socratically from its forces and closed as an **ADR** (Architecture
> Decision Record, in a box at the end of its phase). The context is **generic** — an
> organization of several autonomous teams owning independent business **domains (A, B, C, …)** —
> so the reasoning stays about the *architecture*, not a specific product.
>
> A later phase documents **when *not* to use microfrontends**.

---

## Phase 0 — Framing & success criteria

### Context (premise)

- An organization of **~5–8 autonomous teams**, each owning one or more **independent business
  domains** (Domain A, B, C, …) of a single web platform.
- **High release cadence:** teams must ship their domain **independently**, with no shared
  release train.
- This is the scale regime in which microfrontends are warranted — the exercise's premise. The
  reasoning designs *for* that scale rather than re-litigating "MFE vs. modular monolith"
  (kept as a closing trade-off).

### Drivers (the problem microfrontends solve here)

- **Independent deployability** and **team autonomy** (Conway's law) — an **organizational**
  scaling problem, **not** performance or SEO.

### Success criteria (measurable NFRs)

Every later decision is held to these targets:

| Dimension | Metric | Target |
|---|---|---|
| **Delivery (DORA)** | lead time commit→prod · deploy frequency · change failure rate · MTTR | < 1 day · daily per team · < 15% · < 1 h |
| **Runtime (Core Web Vitals)** | LCP · INP · CLS · TTFB | < 2.5 s · < 200 ms · < 0.1 · budgeted per route |
| **Efficiency** | initial JS per remote (gz) · remote load success | < ~150 KB · > 99.9% |
| **Fitness functions** | forbidden cross-MFE imports · contract tests | 0 · green in CI |

Threaded through **every** decision below: **scalability · maintainability · performance ·
security**.

> **ADR-000 — Context & success criteria**
> - **Context:** a generic multi-team (~5–8) front-end platform with independent domains and a
>   high release cadence; microfrontends are the exercise premise.
> - **Decision:** adopt a microfrontend architecture **driven by independent deployability and
>   team autonomy** (not performance/SEO); hold every later decision to the **DORA + Core Web
>   Vitals + fitness-function** targets above.
> - **Consequences:** gains team autonomy and independent delivery; accepts runtime overhead, a
>   wider security surface, and operational complexity — governed in later phases.

---

## Phase 1 — Decomposition (where do we cut?)

**Axis: vertical, by business capability.** Each MFE maps to one **business domain / bounded
context** and is owned **end-to-end by a single stream-aligned team** (UI → application logic →
data access). This aligns the architecture with the org (Conway's law), so a team ships its
domain without coordinating with others.

**Rejected — horizontal slicing** (a "header" MFE, a "components" team): every functional change
would cross several MFEs and teams, maximizing coupling — the opposite of the goal.

**Granularity.** An MFE = the **deployable unit one team owns** — not finer (a button is not an
MFE; that is orchestration overhead) and not coarser (the whole app). Empirical test: **a typical
change touches exactly one MFE**; if it routinely spans several, the boundary is wrong.
Boundaries follow **DDD bounded contexts** — domains that always change together and share data
are a single MFE.

**Not microfrontends:**

- The **shell** — a thin **host** (platform team) that **composes and renders** the MFEs:
  layout, top-level routing, auth/session, and the remote registry.
- The **design system** — shared, cross-domain UI (atoms, tokens) as a **versioned shared
  library** consumed by every MFE. A library, not an MFE.

**Trade-off accepted:** vertical autonomy duplicates some cross-cutting (each MFE its own data
fetching/state) — contained by the **shared kernel** (design system, HTTP client, contracts).
Horizontal slicing would avoid the duplication but kill autonomy; we choose autonomy.

> **ADR-001 — Decomposition strategy**
> - **Context:** assign domains to teams with minimal cross-team coupling.
> - **Decision:** **vertical decomposition by business capability / bounded context** — one MFE
>   per domain, owned end-to-end by one stream-aligned team; a thin **shell** (platform team)
>   renders the MFEs; a shared **design-system library** serves all MFEs. Granularity rule: an
>   MFE = a team's deployable domain; a typical change touches one MFE.
> - **Consequences:** maximizes autonomy and independent deploy; accepts some cross-cutting
>   duplication (contained by the shared kernel); requires **governance of the shared design
>   system** (Phase 4).

---

## Phase 2 — Integration strategy (how do they come together?)

**Runtime integration (not build-time).** The ADR-000 driver — independent deployability — is
delivered *only* by runtime integration: each remote is built and deployed on its own and loaded
by the host **at runtime** from a versioned manifest. Build-time integration (publishing each MFE
as an npm package the shell bundles) **re-couples deploys** — shipping a remote forces a shell
rebuild + redeploy — so it is rejected despite being simpler and type-safe.

**Single-framework standard + Module Federation.** The organization **standardizes on one
framework** (a governance decision) and integrates remotes with **Module Federation** at runtime.
This shares **singletons** (one framework runtime, one router, one design system), keeping bundle
size and runtime overhead low — directly serving the Core Web Vitals / efficiency NFRs — and
keeping contracts simple.

**Rejected here (kept as escape hatches):** *polyglot freedom* (multiple frameworks) via **Native
Federation** (ESM/import maps) or **Web Components** — framework-agnostic, but duplicates runtimes
(bundle bloat) and complicates shared state/routing and contracts. **Native Federation is the
documented migration path** if polyglot becomes a real requirement later (same mental model,
ESM-native, more future-proof).

> **ADR-002 — Integration strategy**
> - **Context:** remotes must deploy independently; the org can standardize its stack.
> - **Decision:** **runtime integration via Module Federation** on a **single-framework standard**;
>   remotes are loaded by the host from a versioned manifest. Build-time integration is rejected
>   (re-couples deploys); polyglot mechanisms (Native Federation / Web Components) are escape
>   hatches, with **Native Federation as the migration path** if polyglot is required.
> - **Consequences:** independent deployability + shared singletons (low overhead, small bundles);
>   accepts a framework-standardization constraint and Module Federation's runtime orchestration
>   cost (mitigated in Phase 8).

---

## Phase 3 — Composition & rendering (who orchestrates, where it renders)

**The shell composes; rendering is client-side.** The **shell** (host) composes and mounts the
remotes in the browser. Its **minimal** responsibilities: layout/chrome, **top-level routing**,
**auth/session**, the **remote registry/manifest** resolution, provisioning **shared singletons**,
and a **per-remote error boundary**. No domain logic — that lives in the MFEs.

**CSR-first, SSR as a selective trigger.** A client-side app shell is the lowest-complexity
composition and pairs naturally with runtime Module Federation. SSR/edge (server runtime,
hydration, harder federated SSR) is deferred to a **documented trigger**: a specific MFE that
needs SEO (public/indexable content) or whose **LCP/TTFB breaks budget** is rendered with
**selective SSR** (hybrid) — never platform-wide upfront. A multi-team platform is mostly
authenticated, where CSR is appropriate; this avoids paying SSR's operational complexity early.

> **ADR-003 — Composition & rendering**
> - **Context:** the shell must compose remotes; most of the platform is authenticated (SEO
>   irrelevant); SSR adds real operational complexity (federated SSR + hydration).
> - **Decision:** a **client-side app shell (CSR)** composes and mounts remotes; the shell owns
>   layout, top-level routing, auth/session, the remote registry, shared singletons, and
>   per-remote error boundaries. **SSR/edge is a selective trigger** applied to a single MFE when
>   it needs SEO or breaches its LCP/TTFB budget.
> - **Consequences:** simplest composition, fast to evolve; defers SEO/TTFB work to where it is
>   actually needed; the trigger keeps the door open with no upfront cost.

---

## Phase 4 — Shared concerns & contracts (cooperating without coupling)

### 4.1 Routing

The **shell owns top-level routes** (one per domain) + 404/guards; each **MFE owns its
sub-routes**. **One** shared-history router singleton so deep links and the back button work
across MFEs; the shell **lazy-mounts** the matching remote on route enter.

### 4.2 Communication & shared state

**No global cross-MFE store** (an anti-pattern that re-couples). Layered instead:

- **URL** for navigational state.
- **Shell context** for global concerns (auth, theme, locale), injected at mount.
- **Typed pub/sub event bus** (event contracts in the shared package) for loose cross-MFE signals.
- Each MFE owns its **domain state** internally.
- **Ownership rule:** each datum has exactly **one** owning MFE/source; others **react** via
  events/URL and never read another MFE's internals.

### 4.3 Design-system governance

A **versioned shared library** (single source of truth = design **tokens**), consumed as a
**singleton** via Module Federation shared deps. Released independently with **semver** and an
**N-1 deprecation** policy, owned by a platform/design-system team with a contribution model. This
**contains** the cross-cutting duplication accepted in ADR-001.

### 4.4 Contracts & versioning

Remote interfaces (mount signature, exposed modules, event payloads) ship as a **typed contracts
package**; remotes follow **semver**; **contract tests** in CI verify host↔remote compatibility;
and a **runtime version check** — the host validates the remote's contract **before mounting** and
shows a fallback if incompatible — defends against the version skew inherent to independent
deploys.

> **ADR-004 — Routing**
> - **Context:** navigation must span independently-deployed MFEs.
> - **Decision:** shell owns top-level routes + guards; each MFE owns its sub-routes; one
>   shared-history router singleton; lazy-mount on route enter.
> - **Consequences:** consistent deep links/history; the shell is the single routing authority.

> **ADR-005 — Communication & shared state**
> - **Context:** MFEs must share some state without re-coupling.
> - **Decision:** no global store; **URL + shell context + a typed pub/sub event bus** (shared
>   contracts); each MFE owns its domain state; one owner per datum, others react.
> - **Consequences:** loose coupling and testability; cross-MFE data is eventually consistent.

> **ADR-006 — Design-system governance**
> - **Context:** avoid N divergent UIs while keeping team autonomy.
> - **Decision:** a **versioned shared library** (tokens as source of truth), singleton via
>   Module Federation, **semver + N-1 deprecation**, owned by a platform/DS team with a
>   contribution model.
> - **Consequences:** UI consistency and contained duplication; adds a governance/versioning
>   burden.

> **ADR-007 — Contracts & versioning**
> - **Context:** independent deploys create version-skew risk between host and remotes.
> - **Decision:** a **typed contracts package** + **semver** + **contract tests** in CI + a
>   **runtime version check** (host validates before mounting; degrades with a fallback if
>   incompatible).
> - **Consequences:** breaking changes caught pre-prod and contained at runtime; adds a contract
>   package to maintain.

---

> **Status:** built incrementally via [exercise-3-roadmap.md](exercise-3-roadmap.md). **Next:**
> Phase 5 — security & trust model → ADR-008.
