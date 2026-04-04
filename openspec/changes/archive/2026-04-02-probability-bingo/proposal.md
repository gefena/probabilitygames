## Why

Remove One taught players that placement across numbers matters — but only quantity, not position. Probability Bingo introduces spatial probability: where you place a number in a 3×3 grid determines whether clearing it completes a winning line. This is a meaningfully new concept not covered by any existing game.

## What Changes

- New game page: `ProbabilityBingoPage` — player fills a 3×3 grid with numbers 2–12 (repetition allowed), two dice are rolled each round, matching squares are crossed out, first to complete a row/column/diagonal wins
- Default mode: pre-filled "balanced random" card (guarantees at least one of 5/6/7/8/9 per row and column) — playable immediately with one tap
- Edit mode: tap any square to replace its number via a number picker showing probability hints for each sum
- Two bot opponents: Lucky Larry (random fill) and Probability Pete (concentrates 6/7/8 in one row and one column for maximum expected line speed)
- Live near-bingo highlighting: rows/columns/diagonals one square away from completion are highlighted each round
- Post-game board reveal: all three grids shown with crossed-out squares so the player sees why they won or lost
- Simulator: 100/500/1000 games comparing three grids, bar chart of win rates
- ExplainerPanel introducing spatial probability and line completion; QuizPanel with 3 questions
- New i18n keys in `en.json` and `he.json` under `probabilityBingo.*`
- New quiz file `src/quizzes/probabilityBingo.js`
- Card added to Go Deeper tier on home page, after Remove One
- Route `/probability-bingo` added to `App.jsx`

## Capabilities

### New Capabilities
- `probability-bingo-game`: 3×3 bingo game with two-dice sums, default + edit card modes, bot opponents, near-bingo highlighting, post-game reveal, and simulator

### Modified Capabilities
- `home-page-tiers`: Add Probability Bingo card to Go Deeper tier after Remove One
- `site-shell`: Add `/probability-bingo` route

## Impact

- New file: `src/pages/ProbabilityBingoPage.jsx`
- New file: `src/quizzes/probabilityBingo.js`
- Modified: `src/App.jsx` (new import + route)
- Modified: `src/pages/HomePage.jsx` (new card in Go Deeper tier)
- Modified: `src/i18n/en.json`, `src/i18n/he.json` (new namespace)
- No new dependencies — uses existing Framer Motion, react-i18next, Recharts, GamePageLayout, ExplainerPanel, QuizPanel
