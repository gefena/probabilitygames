## 1. Game logic

- [x] 1.1 Replace 4-climber `steps` state with `{ user: 0, bot: 0 }` — move up on correct bet, down on wrong bet (min 0), win at step 6
- [x] 1.2 Add bot strategy: each round the bot picks the color with the highest spinner percentage; store as `botBet` state
- [x] 1.3 Update `doSpin` to evaluate both user bet and bot bet against the winning color, update both positions accordingly
- [x] 1.4 Update win condition: first to step 6 wins; set `raceWinner` to `'user'` or `'bot'`

## 2. Triangle mountain SVG

- [x] 2.1 Create a `MountainSVG` component: isoceles triangle (viewBox 0 0 240 200), peak at (120,10), user base at (20,190), bot base at (220,190)
- [x] 2.2 Draw 6 step markers along each edge (interpolated positions); highlight the current step for each climber
- [x] 2.3 Place user climber emoji (🧗) on the left edge at their step position; bot emoji (🤖) on the right edge
- [x] 2.4 Draw a star or crown at the peak (step 6) to mark the goal

## 3. UI updates

- [x] 3.1 Replace the 4-climber track grid with `<MountainSVG>` in the right column
- [x] 3.2 Show bot's color bet ("Bot bets: [color emoji]") after player locks their bet, before spinning
- [x] 3.3 Replace the step-dot heading with a compact "You: step N | Bot: step N" scoreboard
- [x] 3.4 Update spin result message to show move direction: "⬆ You moved up!" / "⬇ You moved down" and same for bot

## 4. i18n

- [x] 4.1 Add/update strings in `en.json` and `he.json`: bot label, climb up/down messages, peak reached, scoreboard label, bot bet label
