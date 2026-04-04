## Why

No game in the app teaches the **addition rule for mutually exclusive events**: P(A OR B) = P(A) + P(B). Climber Race fills this gap through a mountain race where the spinner is re-randomised every turn, forcing the player to read changing odds and build an OR bet before each spin. Named characters and a plain-language bet statement make the probability legible for age 10.

## What Changes

- Add a new game page: **Climber Race** — four named climbers race to the summit in 6 steps; each turn a new random spinner is generated; the player picks 1 or 2 climbers as their bet; the combined arc is highlighted on the spinner with a plain-language ratio; the bet resets to empty at the start of each new race
- Add route `/climber-race` and home page card in the Go Deeper tier after Pizza Builder

## Capabilities

### New Capabilities
- `climber-race-game`: four-climber mountain race with per-turn random spinners, 1-or-2-climber OR bet, live arc visualisation, plain-language probability description, win/lose result, race history summary, ExplainerPanel, and QuizPanel

### Modified Capabilities
- `home-page-tiers`: add Climber Race card to Go Deeper tier after Pizza Builder
- `site-shell`: add `/climber-race` route in `App.jsx`

## Impact

- New file: `src/pages/ClimberRacePage.jsx`
- New file: `src/quizzes/climberRace.js`
- Modified: `src/i18n/en.json`, `src/i18n/he.json` — new `climberRace.*` namespace
- Modified: `src/App.jsx` — new route
- Modified: `src/pages/HomePage.jsx` — new card in goDeeper tier
