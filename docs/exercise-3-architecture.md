# Exercise 3 — Architecture Reasoning (AI-assisted)

> **Standalone design exercise:** a **scalable front-end architecture using microfrontends and
> DevOps practices** (scalability, maintainability, performance, security).
>
> It is built **decision by decision** following [exercise-3-roadmap.md](exercise-3-roadmap.md):
> each decision is derived Socratically from its forces and recorded as an **ADR**
> (Architecture Decision Record — log at the end). The context is **generic** — an organization
> of several autonomous teams owning independent business **domains (A, B, C, …)** — so the
> reasoning stays about the *architecture*, not a specific product.
>
> The problem analysis (open loops / happy path / edge cases / errors) is produced per phase as
> we resolve it. A later phase documents **when *not* to use microfrontends**.

---

## Phase 0 — Framing & success criteria

### Context (premise)

- An organization of **~5–8 autonomous teams**, each owning one or more **independent business
  domains** (Domain A, B, C, …) of a single web platform.
- **High release cadence:** teams must ship their domain **independently**, with no shared
  release train.
- This is the scale regime in which microfrontends are warranted — the exercise's premise. The
  reasoning therefore designs *for* that scale; it does not re-litigate "MFE vs. modular
  monolith" (covered as a closing trade-off).

### Drivers (the problem microfrontends solve here)

- **Independent deployability** and **team autonomy** (Conway's law) — an **organizational**
  scaling problem, **not** performance or SEO.

### Success criteria (measurable NFRs)

Every later decision is evaluated against these targets:

| Dimension | Metric | Target |
|---|---|---|
| **Delivery (DORA)** | lead time commit→prod · deploy frequency · change failure rate · MTTR | < 1 day · daily per team · < 15% · < 1 h |
| **Runtime (Core Web Vitals)** | LCP · INP · CLS · TTFB | < 2.5 s · < 200 ms · < 0.1 · budgeted per route |
| **Efficiency** | initial JS per remote (gz) · remote load success | < ~150 KB · > 99.9% |
| **Fitness functions** | forbidden cross-MFE imports · contract tests | 0 · green in CI |

Threaded through **every** decision below: the four cross-cutting requirements —
**scalability · maintainability · performance · security**.

---

## Architecture Decision Records

> Format: **Context · Decision · Consequences**. One ADR per decision, filled as the roadmap
> phases are executed.

### ADR-000 — Context & success criteria

- **Context:** a generic multi-team (~5–8) front-end platform with independent domains and a
  high release cadence; microfrontends are the exercise premise.
- **Decision:** adopt a microfrontend architecture **driven by independent deployability and
  team autonomy** (not performance/SEO), and hold every subsequent decision to the **DORA +
  Core Web Vitals + fitness-function** targets above.
- **Consequences:** gains team autonomy and independent delivery; accepts runtime overhead, a
  wider security surface, and operational complexity — to be governed in later phases.

---

> **Status:** this document is built incrementally via
> [exercise-3-roadmap.md](exercise-3-roadmap.md). **Next:** Phase 1 — decomposition (ADR-001).
