## Why

Eight game cards in the "Go Deeper" tier display raw i18n key strings as their subtitle (e.g. `home.games.higherOrLower.desc`) because the corresponding keys are missing from `en.json` and `he.json`. This is visible to all users on the live site right now.

## What Changes

- Add `home.games.<game>.desc` entries to `en.json` for the 8 affected Go Deeper games: Higher or Lower, Roll & Race, Dice Detective, Pizza Builder, Remove One, Probability Bingo, Climber Race, Bridge Quest
- Add matching Hebrew translations to `he.json`

No code changes — this is i18n data only.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `i18n-completeness`: All game cards now have descriptions in both locales

## Impact

- `src/i18n/en.json` — add 8 `home.games.*.desc` entries
- `src/i18n/he.json` — add 8 matching Hebrew entries
