## Context

Games display raw numbers (counts, percentages) but don't interpret them for the user. The ExplainerPanel gives static conceptual text, but nothing reacts to the actual data being generated in real-time.

## Goals / Non-Goals

**Goals:**
- Add reactive nudges to 4 games that highlight surprising or educational moments
- Nudges should appear/change as game state changes — not static
- Nudges should feel natural and concise, not preachy
- All nudge text must be i18n-ready

**Non-Goals:**
- Adding nudges to every game (start with 4 high-impact ones)
- Pop-ups, modals, or toast notifications — nudges are inline text
- Teaching formal math — nudges point at the interesting thing, the explainer teaches why

## Decisions

**Nudge logic as pure functions** — `getNudge(gameState) → i18nKey | null`. Each game has its own nudge function in a shared utility. The function receives the current game state (counts, percentages, round number) and returns a nudge key with interpolation params, or null if nothing interesting is happening.

**Nudge placement**: small text block near the main data display, styled in a muted color with a subtle fade-in animation. Positioned where the user is already looking.

**Specific nudges per game:**

**Coin Flip Lab:**
- At 20+ flips: compare to expected 50% — "normal range" (within 1.5 standard deviations) or "unusually far" (beyond 2 SD). Use `√n` rule for the threshold.
- At 100+ flips: note if convergence is visible — "Getting closer to 50%"
- After ×100 batch: "100 flips at once — notice how the percentage barely changed?"

**Galton Board:**
- At 50+ balls: overlay the theoretical binomial distribution curve on the Recharts histogram (as a Line series on the same chart)
- At 500+ balls: "The shape is settling into a bell curve — that's the Central Limit Theorem at work" (using kid-friendly language)

**Candy Jar:**
- After composition change: "Changing the mix from X to Y shifted your odds from A% to B%"
- When probability crosses a threshold (e.g., red > 50%): "Reds are now the majority — more than half the jar!"

**Lucky Dice:**
- After 50+ rolls: compare observed vs expected frequency for the loaded face
- Highlight the difference: "Face 6 appeared X% of the time vs the expected Y%"

**Animation**: `AnimatePresence` with a simple `opacity` + `y` transition. Nudges fade in when they appear and fade out when state changes.

## Risks / Trade-offs

- **Risk**: Nudges becoming annoying with repetition → Mitigation: each nudge only shows once per threshold crossing (e.g., "normal range" nudge at 20 flips, then updates at 50 and 100, not every flip)
- **Risk**: Too many nudges on screen at once → Mitigation: only one nudge visible at a time per game, latest wins
