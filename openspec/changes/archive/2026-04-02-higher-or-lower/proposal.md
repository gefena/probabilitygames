## Why

The app has no game that teaches conditional probability — the idea that the odds of the *next* outcome depend on what you can *see right now*. Higher or Lower fills that gap with a simple, tense streak game where every roll makes the probabilities shift visibly before the player guesses.

## What Changes

- New game page: `HigherOrLowerPage` — roll a d6, predict whether the next roll is higher or lower, build the longest streak you can
- Odds panel shown before each guess: displays P(higher), P(equal), P(lower) for the current die face
- Equal = push rule: tie preserves the streak but scores no point, with an inline explanation that P(equal) = 1/6 always
- Streak counter with session best; no explicit target — beating your own best is the hook
- ExplainerPanel introducing conditional probability; QuizPanel with 3 questions
- New i18n keys in `en.json` and `he.json` under `higherOrLower.*`
- New quiz file `src/quizzes/higherOrLower.js`
- Card added to Start Here tier on home page
- Route `/higher-or-lower` added to `App.jsx`

## Capabilities

### New Capabilities
- `higher-or-lower-game`: Single-die higher/lower prediction game with live odds display, push-on-equal tie rule, and streak tracking

### Modified Capabilities
- `home-page-tiers`: Add Higher or Lower card to Start Here tier
- `site-shell`: Add `/higher-or-lower` route

## Impact

- New file: `src/pages/HigherOrLowerPage.jsx`
- New file: `src/quizzes/higherOrLower.js`
- Modified: `src/App.jsx` (new import + route)
- Modified: `src/pages/HomePage.jsx` (new card in Start Here tier)
- Modified: `src/i18n/en.json`, `src/i18n/he.json` (new namespace)
- No new dependencies — uses existing Framer Motion, react-i18next, GamePageLayout, ExplainerPanel, QuizPanel
