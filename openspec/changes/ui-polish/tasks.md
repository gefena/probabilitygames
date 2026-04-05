## 1. Quiz Cycle Summary

- [x] 1.1 Add `cycleHistory` state (array of booleans) and `phase` state (`'quiz' | 'summary'`) to `QuizPanel`
- [x] 1.2 On `handleSelect`, push the result (`isCorrect`) to `cycleHistory`
- [x] 1.3 In `handleNext`, when `currentIndex` is the last question, set `phase = 'summary'` instead of wrapping index
- [x] 1.4 Render a summary screen when `phase === 'summary'`: show score ("X / Y"), a coloured dot row (green=correct, red=incorrect), and a "Try again" button
- [x] 1.5 Add i18n keys `quiz.summary`, `quiz.tryAgain` and `quiz.score` (e.g. "{{correct}} / {{total}}") to `en.json` and `he.json`
- [x] 1.6 "Try again" resets `currentIndex`, `cycleHistory`, `phase`, `selected`, `revealed` to initial values

## 2. Collapsible ExplainerPanel

- [x] 2.1 Add `isOpen` state (default `true`) to `ExplainerPanel`
- [x] 2.2 Convert the title row (`<h3>`) into a `<button>` that toggles `isOpen`, with a `▲`/`▼` chevron on the trailing side
- [x] 2.3 Wrap the collapsible content (body, visual, example, callout, furtherReading) in an `AnimatePresence` + `motion.div` with `height: 0 → auto` and `opacity: 0 → 1` transition
- [x] 2.4 Ensure the panel still renders correctly when any optional prop (visual, callout, furtherReading) is absent

## 3. Route Fade Transition

- [x] 3.1 Add `useLocation` import to `AppLayout.jsx`
- [x] 3.2 Import `AnimatePresence` and `motion` from `framer-motion` in `AppLayout.jsx`
- [x] 3.3 Wrap `<Outlet />` in `<AnimatePresence mode="sync">` with a `motion.div` keyed on `location.pathname`, using `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.15 }}`

## 4. Game Page Accent Bar

- [x] 4.1 Add `useLocation` import to `GamePageLayout.jsx`
- [x] 4.2 Define a `GAME_ACCENTS` lookup object mapping each game pathname to a Tailwind `from-*` colour class, covering all 27 game routes; default to `from-violet-400`
- [x] 4.3 Render a `<div className="h-0.5 bg-gradient-to-r {accent} to-transparent -mx-4 mb-4 rounded-full" />` at the top of the page container

## 5. Home Page Welcome Area

- [x] 5.1 Replace the bare `<p className="text-center ...">` subtitle in `HomePage.jsx` with a compact card `<div>` containing the subtitle text, a soft `bg-white/70` background, rounded corners, and subtle border
- [x] 5.2 Add a small emoji cluster (e.g. `🎲 🪙 🎯`) above the subtitle text within the card
