## Why

The site has two types of games: hands-on probability games and deeper explorations, but none that show how randomness itself creates order. These "emergence" phenomena — bell curves from coin flips, π from darts, paths from random steps — are the most visually stunning and intellectually surprising concepts in probability, and they're completely absent. Adding a dedicated "Patterns in Chaos" section fills this gap with four games that deliver genuine wow moments and deepen understanding for kids.

## What Changes

- New section on the home page: "Patterns in Chaos" — a visually distinct block (dark/cosmic aesthetic) with 4 game cards
- Four new game pages:
  - **Galton Board**: Balls fall through pegs, bell curve emerges from pure randomness
  - **Random Walk**: A dot wanders randomly, the spread follows √n law
  - **Monte Carlo π**: Random darts approximate π, converging in real-time
  - **Monty Hall**: The classic door problem — switch or stay? Stats reveal the truth
- Full bilingual support (EN/HE) for all new content
- 4 new quiz sets (one per game)
- Home page gets a third section block with its own header and 4-column card grid

## Capabilities

### New Capabilities

- `galton-board`: Animated peg board where balls cascade and form a bell curve histogram, with controls for 1/10/100/1000 ball drops
- `random-walk`: 2D random walk visualization showing one live path plus faded overlays, with √n drift ring and trial simulation
- `monte-carlo-pi`: Dart-throwing simulation inside a circle, π approximation converging in real-time with accuracy meter
- `monty-hall`: Interactive 3-door game with manual play first, then batch simulation showing 33% vs 66% switch/stay split

### Modified Capabilities

- `home-page`: New third section "Patterns in Chaos" added below existing sections (layout addition, no existing requirement changes)

## Impact

- `src/pages/GaltonBoardPage.jsx` — new file
- `src/pages/RandomWalkPage.jsx` — new file
- `src/pages/MonteCarloPiPage.jsx` — new file
- `src/pages/MontyHallPage.jsx` — new file
- `src/quizzes/galtonBoard.js`, `randomWalk.js`, `monteCarloPi.js`, `montyHall.js` — new quiz files
- `src/App.jsx` — 4 new routes
- `src/pages/HomePage.jsx` — new section block
- `src/i18n/en.json`, `src/i18n/he.json` — new keys for all 4 games
- No new dependencies — uses Recharts (already installed) for histograms, SVG/Canvas for animations
