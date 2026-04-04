## Context

Greenfield web app targeting 10-year-old children learning probability through interactive games. The site must be visually engaging, bilingual (English + Hebrew with RTL support), and fully client-side (no server, no accounts). Five games cover distinct probability concepts from simple coin flips to conditional probability.

## Goals / Non-Goals

**Goals:**
- Modern, colorful, animated UI that feels like a game rather than a lesson
- Full English ↔ Hebrew switching with proper RTL layout flip
- Five self-contained probability games, each with a live statistics panel
- Responsive layout for desktop and tablet
- Zero backend — all state in React component memory (resets on refresh)

**Non-Goals:**
- User accounts, progress saving, or leaderboards
- Mobile-first optimization (nice-to-have, not required)
- Sound effects or music (can be added later)
- Accessibility beyond basic semantic HTML

## Decisions

### 1. Framework — React + Vite
**Choice**: React 18 with Vite bundler.
**Why**: Fast HMR during development, rich ecosystem, component model maps naturally to isolated games. Alternatives: plain HTML/JS (no component reuse), Next.js (overkill — no SSR or routing needed).

### 2. Styling — Tailwind CSS v3 + custom CSS variables for theme
**Choice**: Tailwind CSS **v3** (pinned, not v4) for layout/spacing, custom CSS variables for the color palette and game-specific theming.
**Why**: Tailwind v3 uses the familiar `tailwind.config.js` + PostCSS setup, which is better documented and more stable for this stack. Tailwind v4's CSS-first config (no `tailwind.config.js`) is a significant mental-model shift and not yet necessary for a project this size. RTL is handled via `dir="rtl"` on `<html>` combined with Tailwind v3's logical properties (`ms-`, `me-`, `ps-`, `pe-`) — physical margin/padding classes (`ml-`, `mr-`) MUST be avoided. Alternatives: CSS Modules (more boilerplate), styled-components (runtime cost).

### 3. Animations — Framer Motion
**Choice**: Framer Motion for all game animations (coin flip, dice roll, card reveal, spinner spin).
**Why**: Declarative spring/tween animations, layout animations, and AnimatePresence for mount/unmount. Alternatives: CSS keyframes (less control), GSAP (license complexity).

### 4. Internationalization — react-i18next
**Choice**: react-i18next with two JSON resource files (`en.json`, `he.json`).
**Why**: Battle-tested, supports dynamic language switch without page reload, integrates with `dir` attribute change on `<html>`. Alternatives: FormatJS/react-intl (heavier API).

### 5. Charts — Recharts
**Choice**: Recharts for bar/pie charts in the statistics panels.
**Why**: React-native, responsive, minimal config, animates on data update — important for showing probability converging in real time. Alternatives: Chart.js (imperative, harder to integrate with React state), D3 (too low-level).

### 6. Routing — React Router v6
**Choice**: Single-level routing (`/`, `/coin-flip`, `/dice`, `/candy-jar`, `/spinner`, `/card-draw`).
**Why**: Each game is a full-page experience; back button should work. Hash router for zero-config deployment on static hosts.

### 7. Deployment target — static hosting (e.g., GitHub Pages / Netlify)
**Choice**: Build outputs to `dist/` — no server required.
**Why**: Simplest deployment; aligns with "no backend" goal.

## Risks / Trade-offs

- **Animation performance on low-end tablets** → Framer Motion can be heavy; mitigate by keeping simultaneous animated elements to ≤ 5 per frame and using `will-change: transform` sparingly.
- **Hebrew number formatting** → `Intl.NumberFormat` with `he` locale handles numerals correctly (standard Western digits used in modern Hebrew web content).
- **RTL + Tailwind v3**: Tailwind v3 logical properties (`ms-`, `me-`, `ps-`, `pe-`) handle RTL automatically; physical margin/padding classes (`ml-`, `mr-`) must be avoided project-wide.
- **No persistence** → Statistics reset on page refresh; for a teaching tool this is fine, but could frustrate kids mid-experiment. Acceptable trade-off.

## Migration Plan

New greenfield project — no migration. Deployment steps:
1. `npm run build` → `dist/`
2. Deploy `dist/` to any static host
3. Configure host to serve `index.html` for all routes (SPA fallback)

## Open Questions

- Should the spinner game allow kids to *save* a custom spinner? (Local storage only — low effort add-on.)
- Font choice for Hebrew: system font stack vs. bundled Google Font (Heebo is a good RTL-friendly sans-serif).
