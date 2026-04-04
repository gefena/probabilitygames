## Why

The gambler's fallacy — believing that a streak must end soon — is one of the most common and costly probability misconceptions. The existing Coin Flip quiz touches it as a question, but there is no interactive game that lets kids *feel* how streaks work over many trials. A dedicated "streak mode" makes the lesson visceral: kids are surprised to find that long streaks are far more common than their intuition predicts.

## What Changes

- Add a **Streak Hunter** mode to the existing Coin Flip page (new tab/toggle, not a separate page).
- In Streak Hunter mode the flip history scrolls as a coloured sequence. The player predicts "will the next flip break the current streak?" and scores points for correct predictions.
- A live tally shows "longest streak so far" and "how many streaks of length N occurred", updating after each flip.
- The explainer teaches: the probability of a streak continuing is always 50%, regardless of how long the streak already is.

## Capabilities

### Modified Capabilities

- `coin-flip-lab`: Add Streak Hunter mode — streak display, prediction mechanic, streak-length tally, and updated explainer content.

### New Capabilities

_(none — extends existing page)_

## Impact

- Modified file: `src/pages/CoinFlipPage.jsx`
- New i18n keys under `coin.streak.*`
- No new dependencies
