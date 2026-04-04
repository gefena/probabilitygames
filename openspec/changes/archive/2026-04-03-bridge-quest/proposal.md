## Why

No game in the app teaches the multiplication rule for **sequential independent events in a chain**: P(survive path) = P(bridge 1) × P(bridge 2) × … × P(bridge n). Bridge Quest fills this gap by framing the concept as a path-finding challenge — three parallel paths, each with 2–4 bridges of varying safety, where the player must find the safest full route and race a bot across it over a 3-race tournament.

## What Changes

- Add a new game page: **Bridge Quest** — three parallel paths from START to END, each with 2–4 bridges showing individual survival probabilities; player taps a path to preview its combined survival %, then commits; a Greedy Bot (picks the path whose worst bridge is highest) races against the player; animated bridge-by-bridge crossing reveals the result; best of 3 races wins the tournament
- Add route `/bridge-quest` and home page card in the Go Deeper tier after Climber Race

## Capabilities

### New Capabilities
- `bridge-quest-game`: parallel-path race with sequential bridge probabilities, tap-to-preview combined survival %, Greedy Bot opponent, bridge-by-bridge crossing animation, 3-race tournament, ExplainerPanel, and QuizPanel

### Modified Capabilities
- `home-page-tiers`: add Bridge Quest card to Go Deeper tier after Climber Race
- `site-shell`: add `/bridge-quest` route in `App.jsx`

## Impact

- New file: `src/pages/BridgeQuestPage.jsx`
- New file: `src/quizzes/bridgeQuest.js`
- Modified: `src/i18n/en.json`, `src/i18n/he.json` — new `bridgeQuest.*` namespace
- Modified: `src/App.jsx` — new route
- Modified: `src/pages/HomePage.jsx` — new card in goDeeper tier
