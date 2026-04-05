## Context

Five independent UI improvements to shared components and layout files. No game logic changes. Framer Motion is already in the bundle (used in QuizPanel, GameCard). All changes are additive or replace existing UI elements with improved versions.

## Goals / Non-Goals

**Goals:**
- Quiz feels complete with acknowledgment after each cycle
- Explainer doesn't force excessive scrolling on mobile
- Route changes feel smooth on all form factors
- Game pages have visual identity tied to their home card colour
- Home page has a welcoming anchor before the grid

**Non-Goals:**
- Changing any game logic or probability mechanics
- Persisting quiz scores across sessions (session-only)
- Redesigning the home page tier structure
- Adding new game pages or content

## Decisions

**D1 — Quiz cycle summary as an in-panel state, not a modal**
When `currentIndex` would wrap to 0, instead transition to a `summary` phase showing score + coloured dot history. A "Try again" button resets the cycle. Keeps everything within the existing QuizPanel card. No new component needed.

State addition: `cycleHistory` array of booleans (true=correct), `phase: 'quiz' | 'summary'`. On `handleNext` when `currentIndex === questions.length - 1`, set `phase = 'summary'` instead of wrapping. On "Try again", reset `currentIndex`, `cycleHistory`, `phase`, `selected`, `revealed`.

**D2 — ExplainerPanel collapsible via local state, open by default**
Add `isOpen` state defaulting to `true`. Title row becomes a `<button>` with a chevron indicator. Body/example/callout/furtherReading only render when `isOpen`. No localStorage persistence — starts open every session. AnimatePresence wraps the content for a smooth expand/collapse.

**D3 — Route fade via AnimatePresence in AppLayout, mode="sync"**
`mode="sync"` means incoming and outgoing routes fade simultaneously → total 150ms. `mode="wait"` would be 300ms (out then in) which feels sluggish for a game app. Key is `location.pathname`. Wrap `<Outlet />` in a `motion.div` inside `AnimatePresence`.

**D4 — Game page accent from pathname lookup in GamePageLayout**
`useLocation()` is already available via react-router-dom. A `GAME_ACCENTS` object maps pathname → Tailwind gradient class (e.g. `'/coin-flip': 'from-violet-400'`). A 3px `h-0.5` div at the very top of the page container uses `bg-gradient-to-r ${accent} to-transparent`. Falls back to `from-violet-400` for unknown paths. Zero changes to any individual game page file.

**D5 — Home hero as a styled card wrapping existing subtitle**
The existing `t('home.subtitle')` string moves inside a light card with a soft background, centred emoji cluster above it, and gentle border. No new i18n keys needed. Replaces the bare `<p>` with a `<div>` card of similar height. The grid starts immediately below.

## Risks / Trade-offs

- [AnimatePresence + Outlet] React Router v6's `<Outlet>` renders the matched child directly. Wrapping it in `motion.div` with a key on `pathname` works correctly but requires `useLocation()` to be called in `AppLayout` (currently not imported there). Minor addition.
- [Quiz summary] If a user answers all questions wrong (0/3), the summary still shows — "You got 0 out of 3". This is fine; it's honest feedback.
- [Collapsible explainer] Some games use the `visual` prop of ExplainerPanel — confirm it collapses correctly alongside the other content sections. It should since all optional sections render inside the collapsible region.

## Migration Plan

All changes deploy automatically via Vercel on merge to `main`. No data migration. Each improvement is independently deployable — they share no dependencies between them.
