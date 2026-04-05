## Why

Higher or Lower is the simplest game at 199 lines — guess higher/lower on a single die, repeat. The odds panel is good but there's no escalation. After understanding the basic concept (in ~2 minutes), there's no reason to keep playing. Adding difficulty tiers that introduce new probability concepts makes the game deeper without making it more complex to start.

## What Changes

Add two escalation tiers that unlock based on streak length:

1. **Base mode** (current): single d6, guess higher or lower
2. **Two-dice mode** (unlocks at streak 5): roll two d6, guess if the SUM is higher or lower — now the odds involve a non-uniform distribution (7 is most likely)
3. **Double-or-nothing** (available from streak 3): optional side bet — wager your entire streak that the next roll is exactly a specific value. Huge risk, huge payoff for understanding exact probabilities

Update the odds panel to show the new distributions (bell-shaped for two-dice sum). Update the explainer to cover sum distributions.

## Capabilities

### New Capabilities

_(none — this extends the existing higher-or-lower-game)_

### Modified Capabilities

- `higher-or-lower-game`: Add two-dice mode and double-or-nothing option with updated odds display

## Impact

- `src/pages/HigherOrLowerPage.jsx` — significant expansion (~100-150 new lines)
- `src/i18n/en.json` and `he.json` — new strings for mode labels, sum odds, double-or-nothing UI
- `src/quizzes/higherOrLower.js` — may add questions about sum distributions
