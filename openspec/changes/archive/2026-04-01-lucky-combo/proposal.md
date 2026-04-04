## Why

Every game currently teaches single-event probability. Real-world probability almost always involves combining events ("what are the chances of X and Y both happening?" or "what are the chances of X or Y?"). The multiplication and addition rules for independent events are the natural next step after kids understand basic probability.

## What Changes

- Add a new **Lucky Combo** game where kids configure 2–3 independent probability events (coin, die face, spinner slice, colour draw) and choose whether to combine them with AND or OR.
- The game computes the combined probability using P(A AND B) = P(A) × P(B) and P(A OR B) = P(A) + P(B) − P(A AND B).
- Kids make a prediction, then run many trials to see if the combined event frequency matches the formula.
- A tree diagram visual shows all branches and highlights the winning paths.

## Capabilities

### New Capabilities

- `lucky-combo`: Compound-events game with configurable independent events, AND/OR combinator, tree-diagram visual, and prediction-vs-result feedback.

### Modified Capabilities

_(none)_

## Impact

- New file: `src/pages/LuckyComboPage.jsx`
- New route in `src/App.jsx`
- New home-page card in `src/pages/HomePage.jsx`
- New i18n keys under `luckyCombo.*`
- No new dependencies
