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

> **Status:** built incrementally via [exercise-3-roadmap.md](exercise-3-roadmap.md). **Next:**
> Phase 3 — composition & rendering (CSR shell vs. SSR/edge) → ADR-003.
