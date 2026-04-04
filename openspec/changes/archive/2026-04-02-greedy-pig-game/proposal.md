## Why

Most games in the app are observational — kids watch distributions form. Greedy Pig is decisional: every roll is a live risk/reward choice with real stakes. It teaches expected value, variance, and optimal stopping through gut-level gameplay, not charts. The bust moment (losing your whole turn) creates the emotional hook that makes the math memorable.

## What Changes

- Add **GreedyPigPage** — a single-player game vs. a live animated bot. First player to reach the configurable target score wins.
- **Target score** is user-configurable via presets [30, 50, 75, 100], defaulting to 50.
- **Bot plays live**: animated die rolls with deliberation pauses, micro-reactions (lucky roll, bust, banking), and a banking threshold scaled to the target score (~35% of target).
- **Simulator** unlocks after the first completed game: test different banking strategies (bank at 10/15/20/25/30) over N simulated games and compare win rates in a bar chart.
- Add page to the **Home page** in a new or existing section, with route `/greedy-pig`.
- Add routes, i18n keys (EN + HE), quiz questions, and ExplainerPanel for the page.

## Capabilities

### New Capabilities

- `greedy-pig-game`: Full game loop — player turn (roll/bank/bust), live bot turn with animated decisions, configurable win target, win detection, score tracking, simulator with strategy comparison.

### Modified Capabilities

- `i18n-completeness`: New i18n keys for the game (EN + HE) must satisfy existing key-parity requirement.
- `site-shell`: Home page gains a card for Greedy Pig; route added to App.jsx.

## Impact

- New files: `src/pages/GreedyPigPage.jsx`, `src/quizzes/greedyPig.js`
- Modified: `src/App.jsx` (1 new route), `src/pages/HomePage.jsx` (new card), `src/i18n/en.json`, `src/i18n/he.json`
- No new dependencies required
