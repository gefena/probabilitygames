## Context

The app is a React 19 + Vite SPA with HashRouter, Tailwind v3, Framer Motion, Recharts, and react-i18next (EN/HE). All games follow the same page pattern: simulation controls, animated visualization, an ExplainerPanel, and a QuizPanel. No new dependencies are needed — Recharts handles histograms, SVG/Canvas handles custom animations.

The "Patterns in Chaos" section introduces a new visual identity on the home page: a dark-background block that contrasts with the existing light-card sections, signaling a different kind of content.

## Goals / Non-Goals

**Goals:**
- 4 fully playable games with animated visualizations, quiz panels, and complete EN/HE i18n
- A named "Patterns in Chaos" section on the home page with its own dark-styled container
- Each game delivers a visible "wow moment" — the moment randomness reveals a pattern
- All games pass `npm run lint` and `npm run build` without new warnings

**Non-Goals:**
- No new npm dependencies (use Recharts + SVG already in project)
- No persistent state (no localStorage, no cross-game tracking)
- No multiplayer or shared sessions
- No server-side computation

## Decisions

### Animation strategy per game

| Game | Approach | Rationale |
|---|---|---|
| Galton Board | `requestAnimationFrame` loop, ball positions in `useRef`, histogram in state | Balls need per-frame physics; histogram updates on landing, not every frame |
| Random Walk | SVG `<polyline>` built step-by-step with `setInterval`, multiple walks as faded overlays | SVG scales perfectly, overlays are just opacity-reduced copies |
| Monte Carlo π | Canvas 2D API via `useRef`, dots drawn directly to canvas | Thousands of dots — canvas handles this; DOM would be too slow |
| Monty Hall | Pure React state + Framer Motion for door reveals | Low frame-rate need; all about interactivity and reveal drama |

### Histogram rendering (Galton Board)
Use Recharts `BarChart` for the histogram, updated after each ball lands. Alternative considered: custom SVG bars — rejected because Recharts handles RTL and responsive sizing automatically.

### π display (Monte Carlo)
Show π to 5 decimal places with color-coded accuracy: green when within 0.01 of Math.PI, yellow within 0.1, red otherwise. The live convergence is the main visual.

### Monty Hall flow
Force manual play first (min 1 manual game) before unlocking the simulator. This ensures the user *feels* the wrongness before seeing the stats. Switch/Stay results tracked separately with color-coded bars.

### Home page section structure
New `<section>` with `bg-slate-900` background, full-width, containing:
- Section header (white text, star icon)
- 4-column grid (2×2 on mobile, 4-col on lg) of dark game cards

Cards use the same router Link pattern as existing "Explore More" buttons but with a dark card aesthetic and animated mini-preview icon.

### i18n key namespace
All new keys under `galtonBoard.*`, `randomWalk.*`, `monteCarloPi.*`, `montyHall.*` — consistent with existing game key namespacing.

### Quiz files
One file per game at `src/quizzes/<camelCase>.js`, 3 questions each. Same structure as existing quiz files.

## Risks / Trade-offs

- **Canvas + React refs**: Monte Carlo canvas won't re-render with React lifecycle — must use `useEffect` and `useRef` carefully. Mitigation: clear and redraw on each simulation step, never access canvas outside effect.
- **Galton Board perf**: 1000 balls simultaneously could lag on slow devices. Mitigation: stagger ball drops with `setTimeout`, cap concurrent live balls at ~20, batch the rest.
- **RTL SVG**: Random Walk SVG `<polyline>` doesn't respond to RTL direction. Mitigation: use coordinate system that is direction-neutral (center origin), no text inside SVG paths.
- **Monty Hall manual-first gate**: User might find it frustrating if they want to jump to simulation. Mitigation: gate is just 1 manual game — low friction.
