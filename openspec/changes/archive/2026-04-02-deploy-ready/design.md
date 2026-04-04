## Context

React 18→19 SPA, Vite 8, Tailwind 3, HashRouter. Static site — no backend, no secrets. Target: public GitHub repo + Vercel free tier.

## Goals / Non-Goals

**Goals:**
- `npm run lint` exits 0
- `npm run build` exits 0 with no warnings
- `git push` doesn't accidentally upload `node_modules`, `dist`, or `.claude`
- Vercel deploys correctly on first push
- Basic SEO metadata present for social sharing

**Non-Goals:**
- Switching from HashRouter to BrowserRouter (separate decision; `vercel.json` will be ready for it)
- Performance tuning beyond eliminating the >500 KB warning
- Full accessibility audit (separate change)
- Analytics / tracking

## Decisions

### Decision 1: Fix `motion` lint false-positive with `eslint-plugin-react`

ESLint's core `no-unused-vars` rule doesn't always mark a variable as "used" when it only appears as the namespace of a JSX member expression (`<motion.div>`). The canonical fix is `eslint-plugin-react` with the `react/jsx-uses-vars` rule, which specifically handles this case.

Add `eslint-plugin-react` as a dev dependency and extend the flat config with `react.configs.flat.recommended` (or just the `jsx-uses-vars` rule to stay minimal). Use the "recommended" preset and disable rules that conflict with modern React (no need for `react/react-in-jsx-scope` with the new JSX transform).

### Decision 2: Manual chunks in Vite

Split by library group to get parallel HTTP/2 downloads and better long-term caching:
- `vendor-react`: `react`, `react-dom`, `react-router-dom`
- `vendor-motion`: `framer-motion`
- `vendor-charts`: `recharts`
- `vendor-i18n`: `i18next`, `react-i18next`

This should drop the main chunk well below 500 KB.

### Decision 3: HashRouter + `vercel.json`

The site currently uses `HashRouter` (`/#/birthday-room`). This works on Vercel without any config. However, adding `vercel.json` with a catch-all rewrite to `index.html` enables `BrowserRouter` in the future at zero cost today. Adding it now is safe and forward-compatible.

### Decision 4: SEO meta tags in `index.html`

Static meta tags are sufficient (this is not server-rendered). The `<html lang>` attribute is already updated at runtime by `App.jsx` (`document.documentElement.lang`), so the static `lang="en"` is acceptable as the initial fallback.

OG image: use the existing `favicon.svg` as a placeholder `og:image` until a proper image is created.

## Risks / Trade-offs

- **Risk: `eslint-plugin-react` recommended rules fail on existing code** — Mitigate by disabling rules that don't apply: `react/prop-types`, `react/react-in-jsx-scope`. Only enable `react/jsx-uses-vars`.
- **Risk: Manual chunk split breaks the build** — Vite's `manualChunks` is stable; easy to revert by removing the option.
