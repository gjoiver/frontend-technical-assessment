# Roadmap — Architecture definition (Exercise 3)

How the architecture was defined: **decision by decision**, in dependency order. Each phase answers
**one question** (worked out Socratically, as a 10-year architect would) and closes as an **ADR** in
[exercise-3-architecture.md](exercise-3-architecture.md).

Cross-cutting in every phase: **scalability · maintainability · performance · security**.

| Phase | Question it answers | Decision | ADR |
|---|---|---|---|
| 0 | Why microfrontends, and what does "success" mean? | generic multi-team context; success = DORA + Core Web Vitals + fitness | 000 |
| 1 | Where do we cut the app? | vertical — one MFE per domain; thin shell + shared design system | 001 |
| 2 | How do the pieces join? | runtime **Module Federation**, single framework | 002 |
| 3 | Who composes it, where does it render? | client-side app shell (CSR); SSR only as a trigger | 003 |
| 4 | How do MFEs cooperate without coupling? | shell routing · typed event bus · shared design system · contracts + runtime check | 004–007 |
| 5 | How do we secure it? | BFF + httpOnly · CSP/Trusted Types · iframe for untrusted · supply-chain checks | 008 |
| 6 | How does it survive failures? | error boundaries (bulkheads) · OpenTelemetry · rollback by manifest re-pin | 009 |
| 7 | How do we deliver it? | per-MFE CI/CD · gates + AI review · `develop → release → main` · progressive delivery | 010 |
| 8 | How does it stay fast and scale? | shared singletons · lazy/prefetch · budgets · mono→poly & CSR→SSR triggers | 011 |
| 9 | How do we keep it healthy? | governance + fitness functions; plus *when NOT to use MFE* | 012 |

✅ **All 9 phases resolved** (ADR-000…012). Full reasoning, diagrams and AI-prompt transcript in
[exercise-3-architecture.md](exercise-3-architecture.md).
