# Brand Manual — Personal Creative Portfolio

The single source of truth for the product's look, feel and voice. Everything here maps to the
design layer in [`frontend/src/shared/ui/theme/`](frontend/src/shared/ui/theme) — components read
from it, never from hardcoded values.

> ## 🔒 Design source of truth & governance
>
> **Every design change ALWAYS originates in [`frontend/src/shared/ui/theme/`](frontend/src/shared/ui/theme).**
> That folder is the only visual source of truth. Before touching any component, the change must
> exist here:
>
> | File | What it governs |
> |---|---|
> | `tokens.ts` | Color, spacing, typography, radii, shadows, **motion**, `level`, `zIndex`, breakpoints, and **layout** (container width, gutters). The root of every value. |
> | `theme.ts` | The theme composition injected into the `ThemeProvider`. |
> | `GlobalStyle.ts` | Global styles (reset, `body`, background/glow, `:focus-visible`, `::selection`, `scroll-margin`). |
> | `media.ts` | Breakpoint helpers (mobile-first, `min-width`). |
> | `styled.d.ts` | Theme typing (`typeof tokens`) so `props.theme` is type-safe. |
>
> **Rules:**
> 1. A new value (color, size, duration, width) enters **`tokens.ts` first**; the component only
>    consumes it via `theme.*`. No stray hex, `px`, `ms` or bézier curves in components.
> 2. Global behavior changes (background, focus, scroll, reset) go in `GlobalStyle.ts`, not in
>    individual components.
> 3. If a component "needs" a value that isn't in the theme, **the bug is that it's missing from the
>    theme** — add it there, don't hardcode it.
> 4. No design PR is approved if it introduces values outside this folder.

## 1. Brand essence

A **creative developer portfolio**: modern, technical, confident but approachable. The mood is
**dark and elegant**, with a single **violet→indigo gradient** as the signature device used
sparingly for emphasis.

## 2. Logo & signature device

There is no pictorial logo. The brand expresses itself through:

- **Wordmark** — the name / "Portfolio" set in **Inter Bold**.
- **Signature gradient** — `linear-gradient(135deg, #6c5ce7 → #a855f7)`, applied **only** to the
  hero headline and the section-title accent bar.

**Don't:** recolor the gradient, apply it to body text, or stretch/distort the wordmark.

## 3. Color palette

| Token | Hex | Use |
|---|---|---|
| `background` | `#0e0e11` | Page background |
| `surface` | `#17171d` | Cards, bars |
| `surfaceHover` | `#1d1d25` | Hover surface |
| `text` | `#e8e8ea` | Primary text |
| `muted` | `#9a9aa4` | Secondary text, captions |
| `primary` | `#6c5ce7` | Actions, accents, focus ring |
| `primaryHover` | `#7d6ef0` | Hover state of primary |
| `accent` | `#a855f7` | Gradient partner |
| `border` | `#2a2a32` | Borders, dividers |
| `white` | `#fff` | Text on primary/gradient |

**Gradient:** `linear-gradient(135deg, #6c5ce7 0%, #a855f7 100%)`. Background also carries a subtle
radial primary glow for depth. Body text/background meet **WCAG AA** contrast.

## 4. Typography

- **Family:** `Inter`, with `system-ui, sans-serif` fallback.
- **Scale (rem):** `sm 0.875` · `md 1` · `lg 1.25` · `xl 2`. The hero uses a fluid
  `clamp(2.25rem, 6vw, 3.75rem)`.
- **Weights:** `regular 400` · `medium 500` · `bold 700`.
- **Variants** (the `Text` atom — always use these, never raw sizes):

| Variant | Element | Size / Weight |
|---|---|---|
| `h1` | `h1` | xl / bold |
| `h2` | `h2` | lg / bold |
| `h3` | `h3` | md / bold |
| `body` | `p` | md / regular |
| `caption` | `span` | sm / regular |

## 5. Spacing

Scale (rem): `xs 0.25` · `sm 0.5` · `md 1` · `lg 1.5` · `xl 2.5` · `xxl 4`. Use **rem** for spacing
and typography (respects user font-size); **px** only for hairline borders.

## 5.1 Layout & container — hero, padding and gutters

Site content lives in **a single centered container** with a max width and consistent **side
gutters**, so nothing sits flush against the edges. These values are tokens — added to `tokens.ts`
(`layout`) and read via `theme.layout.*`:

```ts
layout: {
  maxWidth: "60rem",   // ~960px — content container width
  gutter:   "1.25rem", // minimum inline padding (mobile); may grow on desktop
},
```

- **Container.** `max-width: theme.layout.maxWidth; margin-inline: auto; padding-inline:
  theme.layout.gutter`. **Never** leave content touching the viewport edge or a card edge: every
  inner block carries padding (`space.md`–`space.lg`).
- **Full-bleed hero, not a box.** The hero glow/gradient is a **decorative background spanning the
  full viewport width**, placed **behind** the content (lower `z-index`, via `theme.zIndex`). The
  hero text aligns inside the same container and gutters, with generous vertical padding
  (`space.xxl` top/bottom). **Forbidden:** rendering the hero as a bordered panel/card or a gradient
  rectangle "floating" in the center, and hero text without padding flush to the edge.
- **Vertical rhythm.** Sections are separated with `space.xxl`; each section's inner padding uses the
  spacing scale, never loose values.

> This section came from an observed defect: the hero appeared as a centered gradient square with
> unpadded content. The fix lives in the theme (`layout` tokens + the base container), not patched
> into the component.

## 6. Radius & elevation

- **Radius (rem):** `sm 0.375` · `md 0.75` · `lg 1.25` · `pill 999px`.
- **Shadows:** `sm` (rest) · `md` (hover/raised) · `lg` (overlays). Cards rest at `sm` and lift to
  `md` on hover.

## 7. Components

- **Card** — `surface` + `border` + `radius.md` + `shadow.sm`; on hover: lift (`translateY(-3px)`),
  `primary` border, `shadow.md`.
- **Tag** — bordered chip, `muted` text, small size (e.g. categories, technologies).
- **Button** — primary action style.
- **SectionTitle** — an `h2` followed by the **gradient accent bar**.
- **Hero** — gradient headline (`h1`) + `muted` subtitle.

## 8. Voice & tone

- **Language:** Spanish for the UI; English for committed docs.
- **Tone:** concise, human, professional — never jargon-heavy. Error copy is helpful, not technical
  (e.g. "Revisa tu conexión a internet", not "NetworkError").
- **Where copy lives:** centralized per feature in `presentation/i18n/` — no hardcoded UI strings.

## 9. Accessibility

- Contrast meets **WCAG AA**; `:focus-visible` shows a `primary` outline.
- `lang="es"` on the document; `aria-label` on navs and icon-only buttons.
- The gradient is decorative only — never the sole carrier of meaning, never on long text.

## 10. Motion & animation

Motion is **subtle and purposeful**: it guides attention and rewards interaction, never distracts or
blocks reading. The motion language is the brand's "alive" signature.

- **Duration (`motion.duration` tokens):** `fast 140ms` (states: hover/active) · `base 240ms`
  (UI transitions) · `slow 520ms` (section entrances / reveals).
- **Easing (`motion.ease` tokens):** `out cubic-bezier(0.22,1,0.36,1)` for almost everything;
  `spring cubic-bezier(0.34,1.56,0.64,1)` for playful micro-accents (social icons, badges).
- **Canonical patterns:**
  - *Scroll-reveal* — sections enter with `opacity 0→1` + `translateY(24px)→0`, staggered by index.
  - *Hero* — an "aurora" background (2–3 blurred gradient blobs drifting ~14s) + a slow *shimmer*
    over the gradient headline. Decorative, behind the content.
  - *Level meters* — fill in as the skills section is revealed.
  - *Card hover* — `translateY(-3px)` + `primary` border + `shadow.md` (already in place).
- **`prefers-reduced-motion`: a non-negotiable rule.** When active, animations and transitions are
  disabled, content appears visible and static, and `scroll-behavior` falls back to `auto`.

## 11. Iconography

- **Single source:** `react-icons` (already installed). Social/contact with `react-icons/fa6`;
  technologies with `react-icons/si` (Simple Icons); generic UI with `react-icons/fi` (Feather).
- **Technologies = identity.** Every skill and every project `technology` carries its brand icon,
  mapped in a `*.config.ts` (`Record<string, IconType>`) with a normalized key
  (`toLowerCase().replace(/[.\s-]/g,'')`) and a **fallback** (`FiCode`).
- **Color:** a tech's brand color is used only in the icon *badge*; text follows the tokens
  (`text`/`muted`). Never recolor body text with third-party colors.
- **Size:** 20px inline with body text; 18px in section titles; always with an `aria-label` when the
  icon is the only label.

## 12. Interactive states

| Component | Rest | Hover | Active | Focus-visible |
|---|---|---|---|---|
| Button (primary) | gradient + `shadow` | `translateY(-2px)` + larger shadow | `scale(0.97)` | `primary` outline |
| Card | `surface` + `border` + `shadow.sm` | `translateY(-3px)` + `primary` border + `shadow.md` | — | `primary` outline |
| Text link | `text`/`primary` | growing underline | — | `primary` outline |
| Icon-button | `muted`, `border` | `white` on `primary` | `scale(0.97)` | `primary` outline |
| Social icon | `muted`, `border` | lift + slight rotation (`ease.spring`) | — | `primary` outline |
| Tech chip | `surface` + `border` | `primary` border + `surfaceHover` | — | `primary` outline |

## 13. Actionable affordances

Every contact detail **is an action**, never dead text:

- **Phone** → `href="tel:…"` (opens the dialer on mobile) + a "copy" button.
- **Email** → `href="mailto:…"` + a "copy" button.
- **Copy** → `navigator.clipboard` with ephemeral feedback (toast / icon-to-check ~1.5s). Copy lives in i18n.
- **Social** → links with `target="_blank" rel="noreferrer"` and their own icon.

## 14. Skill levels (semantic color)

| Level | Token | Hex | Meter |
|---|---|---|---|
| Beginner | `level.Beginner` | `#38bdf8` | 33% |
| Intermediate | `level.Intermediate` | `#a855f7` | 66% |
| Advanced | `level.Advanced` | `#34d399` | 100% |

The color **accompanies** the level's text label (reinforcement, not the sole carrier of meaning).

## 15. New token registry

These tokens are added to `tokens.ts` to support the above (components read them via `theme.*`;
typing is inherited from `typeof tokens` in `styled.d.ts`):

```ts
motion: {
  duration: { fast: "140ms", base: "240ms", slow: "520ms" },
  ease: { out: "cubic-bezier(0.22,1,0.36,1)", spring: "cubic-bezier(0.34,1.56,0.64,1)" },
},
level: { Beginner: "#38bdf8", Intermediate: "#a855f7", Advanced: "#34d399" },
zIndex: { hero: 0, header: 40, progress: 50, toast: 60 },
layout: { maxWidth: "60rem", gutter: "1.25rem" },
```

## 16. Do's & Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Read values from `theme.*` tokens | Hardcode hex / sizes / spacing |
| Use `Text` variants for type | Use raw `font-size` / `as` props |
| Use the gradient sparingly (hero, accent) | Apply the gradient to body text |
| Add new values to `tokens.ts` first | Introduce one-off colors outside tokens |
| Respect `prefers-reduced-motion` always | Animate as the sole carrier of meaning |
| Give each technology its icon (`react-icons`) | Show stacks as plain text |
| Make contact actionable (`tel:`/`mailto:`/copy) | Leave phone/email as dead text |
| Use `motion.*` tokens for duration/easing | Hardcode `ms` or bézier curves in components |
| Make design changes from `shared/ui/theme/` | Patch loose styles in components |
| Full-bleed hero with the background glow | Hero as a centered gradient box/panel |
| Container with `max-width` + gutters; everything padded | Content flush to the window/card edges |
