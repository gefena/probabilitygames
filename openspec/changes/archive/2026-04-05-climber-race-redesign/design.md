## Context

Current page: a 2-column layout with a spinner SVG on the left and 4 climber tracks (step dots) on the right. The track metaphor is unclear and the 4-way race is hard to follow. The spinner logic, bet selection, and round flow all work correctly and will be preserved.

## Goals / Non-Goals

**Goals:**
- Replace the 4-climber step layout with a triangle mountain SVG showing two climbers
- User climbs the left edge, bot climbs the right edge, peak at the top
- Move up on correct bet, move down on wrong bet (floor at step 0)
- Bot is visible — its color bet is shown before the spin
- First to reach the peak (step 6) wins the race
- Reuse the existing spinner, bet selection, round flow, and i18n patterns

**Non-Goals:**
- Changing spinner logic or probability mechanics
- Adding more than 1 bot opponent
- Animated climbing movement (static position update is fine)
- Persisting race state across sessions

## Decisions

**Triangle mountain as SVG** — an isoceles triangle with the peak at the top center. 6 step positions are spaced evenly along each edge. The user's climber (emoji 🧗) sits on the left edge at their current step; the bot's climber (🤖) on the right edge. Both start at step 0 (base corners). Step 6 is the shared peak.

**Step coordinates**: with SVG viewBox 0 0 240 200:
- Peak: (120, 10)
- User base (step 0): (20, 190)
- Bot base (step 0): (220, 190)
- Left edge: interpolate from (20,190) to (120,10) in 6 steps
- Right edge: interpolate from (220,190) to (120,10) in 6 steps

**Move-down mechanic**: wrong bets move the climber DOWN one step (min 0). This makes every spin matter — you can lose ground. Correct bets move UP one step.

**Bot strategy**: each round the bot picks the color with the highest spinner percentage. It's a simple greedy bot — predictable enough for kids to understand, but competitive enough to feel like a real opponent.

**Bot bet visible before spin**: after the player locks their bet and clicks Spin, show "Bot bets: [color emoji]" so the player can compare strategies before the result lands.

**Layout**: keep 2-column grid. Left: spinner (unchanged). Right: triangle mountain SVG replacing the step-dot grid.

**Win condition**: first climber to reach step 6 (the peak). Show a result banner. "Play Again" resets both to step 0.

**Round labels**: replace "Spinner This Turn" heading with a compact scoreboard showing current step for both competitors (e.g. "You: step 3 | Bot: step 4").

## Risks / Trade-offs

- **Risk**: SVG triangle text/emoji positioning is fiddly → Mitigation: use `<text>` with emoji characters and test at multiple step values; fallback to colored circles if emoji render inconsistently in SVG
- **Trade-off**: Move-down mechanic makes the game longer and potentially frustrating → Mitigation: floor at 0 prevents going negative; the race still ends quickly at step 6 (first to 6 correct net bets)
