## Why

The Climber Race game was redesigned so players bet on **colors** (spinner sectors), not on climbers. The game logic and UI are correct, but several i18n strings still say "climber(s)" where they should say "color(s)". This creates a mismatch between what the player sees on screen and what the text tells them to do.

## What Changes

- Fix UI strings: `pickBet`, `noBet` — replace "climber(s)" with "color(s)"
- Fix explainer strings: `explainer.body`, `explainer.example` — replace "climbers" with "colors"
- Fix home page descriptions: `home.tiers.goDeeper.climberRace.desc`, `home.games.climberRace.desc`
- Fix quiz strings: q1 options b/c, q3 question/options/explanation — replace "climbers" with "colors"
- Fix q2 pronoun: "she is due to win again" → "it is due to win again" (Ivy is now a color, not a character)
- Apply all fixes to both `en.json` and `he.json`

## Capabilities

### New Capabilities

### Modified Capabilities
- `climber-race-game`: i18n wording correction (no behavior change)

## Impact

- `src/i18n/en.json` — ~11 string value changes
- `src/i18n/he.json` — ~11 parallel string value changes
- No component, logic, or route changes
