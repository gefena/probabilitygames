## 1. Galton Board

- [x] 1.1 Create `src/quizzes/galtonBoard.js` with 3 quiz questions about bell curves and the Central Limit Theorem
- [x] 1.2 Add `galtonBoard.*` keys to `src/i18n/en.json` (title, subtitle, controls, explainer, quiz keys)
- [x] 1.3 Add matching `galtonBoard.*` keys to `src/i18n/he.json`
- [x] 1.4 Create `src/pages/GaltonBoardPage.jsx` with: animated peg board (requestAnimationFrame), ball drop (×1/×10/×100/×1000), live Recharts BarChart histogram, Reset button, ExplainerPanel, QuizPanel
- [x] 1.5 Add route `/galton-board` in `src/App.jsx`

## 2. Random Walk

- [x] 2.1 Create `src/quizzes/randomWalk.js` with 3 quiz questions about √n drift and random paths
- [x] 2.2 Add `randomWalk.*` keys to `src/i18n/en.json` (title, subtitle, controls, stats labels, explainer, quiz keys)
- [x] 2.3 Add matching `randomWalk.*` keys to `src/i18n/he.json`
- [x] 2.4 Create `src/pages/RandomWalkPage.jsx` with: SVG 2D walk animation (setInterval), path polyline, up to 10 faded overlays, √n drift ring, step counter and distance display, Start/Stop/Reset controls, ExplainerPanel, QuizPanel
- [x] 2.5 Add route `/random-walk` in `src/App.jsx`

## 3. Monte Carlo π

- [x] 3.1 Create `src/quizzes/monteCarloPi.js` with 3 quiz questions about Monte Carlo methods and π
- [x] 3.2 Add `monteCarloPi.*` keys to `src/i18n/en.json` (title, subtitle, controls, stats labels, explainer, quiz keys)
- [x] 3.3 Add matching `monteCarloPi.*` keys to `src/i18n/he.json`
- [x] 3.4 Create `src/pages/MonteCarloPiPage.jsx` with: HTML5 Canvas dart simulation (useRef), colored dots inside/outside circle, live π display with color-coded accuracy (green/yellow/red), dart count stats, Start/Pause/Reset + speed selector (slow/fast/instant), ExplainerPanel, QuizPanel
- [x] 3.5 Add route `/monte-carlo-pi` in `src/App.jsx`

## 4. Monty Hall

- [x] 4.1 Create `src/quizzes/montyHall.js` with 3 quiz questions about the Monty Hall problem and conditional probability
- [x] 4.2 Add `montyHall.*` keys to `src/i18n/en.json` (title, subtitle, door labels, host reveal text, switch/stay buttons, result messages, stats labels, simulator controls, explainer, quiz keys)
- [x] 4.3 Add matching `montyHall.*` keys to `src/i18n/he.json`
- [x] 4.4 Create `src/pages/MontyHallPage.jsx` with: 3 clickable doors with Framer Motion reveal animation, goat/car reveal, switch/stay buttons, manual round win/loss tally (split by strategy), batch simulator (100/1000/10000 games, Recharts bar chart showing switch vs stay win rates), simulator locked until 1 manual game played, ExplainerPanel, QuizPanel
- [x] 4.5 Add route `/monty-hall` in `src/App.jsx`

## 5. Home Page Section

- [x] 5.1 Add `home.patternsInChaos.*` keys to `src/i18n/en.json` (section title, tagline, and desc for all 4 game cards)
- [x] 5.2 Add matching `home.patternsInChaos.*` keys to `src/i18n/he.json`
- [x] 5.3 Add "Patterns in Chaos" section to `src/pages/HomePage.jsx`: dark `bg-slate-900` section block, section header with icon and tagline, 4-column card grid (2-col on mobile) linking to all 4 new routes with distinct accent colors (violet/cyan/rose/amber)

## 6. Quality

- [x] 6.1 Run `npm run lint` and fix any errors introduced by new files
- [x] 6.2 Run `npm run build` and verify no new warnings; confirm all new chunks stay under 500KB
