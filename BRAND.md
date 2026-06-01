# Brand Manual — Personal Creative Portfolio

The single source of truth for the product's look, feel and voice. Everything here maps to the
design **tokens** in [`frontend/src/shared/ui/theme/tokens.ts`](frontend/src/shared/ui/theme/tokens.ts) —
components read from tokens, never from hardcoded values.

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

## 10. Do's & Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Read values from `theme.*` tokens | Hardcode hex / sizes / spacing |
| Use `Text` variants for type | Use raw `font-size` / `as` props |
| Use the gradient sparingly (hero, accent) | Apply the gradient to body text |
| Add new values to `tokens.ts` first | Introduce one-off colors outside tokens |
