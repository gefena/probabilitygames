## Why

The spinner colors are named "Sunny", "Blaze", "Storm", and "Ivy" — these sound like character names, which makes the game feel like betting on a climber to win a race. But the player IS the climber; the colors are just sectors on the spinner. Renaming them to plain color names (Yellow, Red, Blue, Green) removes the character framing and makes the mechanic clear: you're picking which color you think the spinner will land on.

## What Changes

- Rename the four color labels from character names to plain colors:
  - Sunny → Yellow
  - Blaze → Red
  - Storm → Blue
  - Ivy → Green
- Update subtitle and how-to-play copy to frame betting as "pick spinner colors", not "pick climbers"
- Update any string that refers to a color as if it's a competing character

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

_(none — display label renaming only, no spec-level behavior change)_

## Impact

- `src/i18n/en.json` and `he.json` — rename `climberRace.sunny/blaze/storm/ivy` labels; update subtitle, howToPlay, and supporting copy
