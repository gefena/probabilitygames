## Why

A hands-on review of every game page found a mix of real bugs (state leaks, simulator logic errors, broken i18n) and UX rough edges (ambiguous characters, unexplained opponent strategy, abrupt content transitions). Fixing these makes the app feel polished and ensures students don't hit dead-ends or get wrong answers from the interface itself.

## What Changes

- **Fix** stale translation labels in Lucky Combo when the user switches language mid-session — outcome labels are captured at component mount and never re-translated.
- **Fix** `simulateGame` in Remove One ignoring tie outcomes — the first winner in iteration order is returned even when multiple boards clear simultaneously, overcounting player wins in the simulator.
- **Fix** `CoinFlipPage` animation timeout leaking across mode switches — a 600 ms `labFlip` timeout can fire and increment `heads`/`tails` after the user has already switched to streak mode and cleared the state.
- **Fix** `GuessThePhonePage` stale closure in give-up restart — `setTimeout(() => startGame(length), 2000)` captures the old `length`; if the user picks a new length during the 2-second window two conflicting `startGame` calls fire.
- **Fix** `MonteCarloPiPage` instant-mode chunk not respecting pause — `runChunk` processes an entire batch before checking `runningRef.current`, so pausing mid-instant-run adds up to one extra full batch of darts.
- **Improve** Hack the Password Hard mode character display — the charset `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789` includes visually ambiguous pairs (`0/O`, `1/l/I`) that cause students to type the wrong character and believe the game is broken.
- **Improve** Probability Bingo opponent explanation — Pete always uses a hardcoded probability-weighted grid `[6,7,8,4,5,3,9,9,4]` but the game never tells the user this, so students can't learn from observing Pete's strategy.
- **Improve** Galton Board SVG bin-count labels capped at `'99+'` — when dropping 1000 balls, the center bins far exceed 99, but labels are truncated and contradict the histogram bar.
- **Improve** Pizza Builder count-badge abrupt appearance at exactly 20 orders — all cell badges appear simultaneously with no transition, which is jarring.

## Capabilities

### New Capabilities
- `lucky-combo-i18n-labels`: Outcome labels stored as translation keys, resolved at render time
- `remove-one-simulator-ties`: Simulator correctly identifies and counts tie outcomes
- `game-state-reliability`: Stale timeout / closure fixes for CoinFlip, GuessThePhone, and MonteCarloPi
- `hack-password-char-display`: Visual disambiguation for ambiguous characters in Hard mode
- `probability-bingo-pete-strategy`: On-screen hint explaining Pete's fixed strategy
- `game-display-polish`: Galton Board count labels and Pizza Builder badge fade-in

### Modified Capabilities
- None

## Impact

- `src/pages/LuckyComboPage.jsx` — state initialization and label rendering
- `src/pages/RemoveOnePage.jsx` — `simulateGame` function (~line 75-89)
- `src/pages/CoinFlipPage.jsx` — `labFlip` animation timeout guard (~lines 78-96)
- `src/pages/GuessThePhonePage.jsx` — `handleGiveUp` timeout (~lines 71-76)
- `src/pages/MonteCarloPiPage.jsx` — `runChunk` per-dart pause check (~lines 93-105)
- `src/pages/HackThePasswordPage.jsx` — character display and keyboard grid (~lines 264, 290-330)
- `src/pages/ProbabilityBingoPage.jsx` — Pete strategy UI hint (~lines 72-78)
- `src/pages/GaltonBoardPage.jsx` — SVG bin-count label (~line 121)
- `src/pages/PizzaBuilderPage.jsx` — count badge threshold and transition (~lines 292, 309-314)
