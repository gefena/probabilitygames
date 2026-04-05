## Why

The current Climber Race game is visually confusing — four color tracks with step dots don't clearly convey a race or a mountain. The new design replaces it with an intuitive triangle mountain where the user and one bot climb from opposite sides, making the race dynamic and the outcome immediately readable.

## What Changes

- **BREAKING**: Replace the 4-climber step-dot track layout with a triangle mountain SVG
- The user climbs the left side of the mountain; the bot climbs the right side
- Each correct bet moves the player **up** one step; each wrong bet moves them **down** one step (minimum step 0)
- The bot makes its own color bet (visible to the player) and moves by the same rules
- First to reach the peak (top of the triangle) wins
- The spinner still determines which color lands each round
- The player still picks up to 2 colors to bet on; the bot picks 1 color automatically
- The "Next Round" flow (spinner + new bet) stays the same

## Capabilities

### New Capabilities

- `climber-race`: Redesigned mountain climbing race with triangle SVG, two competitors (user + bot), move-up/move-down mechanics

### Modified Capabilities

_(none — this replaces the existing game visual entirely)_

## Impact

- `src/pages/ClimberRacePage.jsx` — full visual and logic rewrite (~200-250 lines affected)
- `src/i18n/en.json` and `he.json` — update/add strings for bot, peak, climb up/down messages
