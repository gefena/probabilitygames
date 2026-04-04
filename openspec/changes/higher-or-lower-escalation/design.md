## Context

Current game: one d6, odds panel shows P(higher)/P(equal)/P(lower) as bar segments with fractions. Streak and best-streak are tracked. Game is 199 lines, the smallest page.

## Goals / Non-Goals

**Goals:**
- Add a two-dice sum mode that introduces non-uniform probability distributions
- Add a double-or-nothing option for risk/reward decisions
- Keep the initial experience simple — escalation is unlocked, not forced
- Update odds panel to visualize the sum distribution

**Non-Goals:**
- Making the base mode harder
- Adding more than 2 dice
- Persisting the unlock state (each session starts fresh — personal-bests handles persistence separately)

## Decisions

**Two-dice unlock at streak 5** — after 5 correct guesses, a "Level Up!" banner appears and the game switches to two-dice mode. The current sum (2–12) is shown with both dice visible. The odds panel now shows a bell-shaped distribution (P(sum) for each value 2–12). The player still guesses higher/lower.

**Double-or-nothing available from streak 3** — an optional button appears: "Bet it all: next roll is exactly ___?" If they pick the exact value and it hits, streak doubles. If wrong, streak goes to 0. This teaches the difference between directional probability (> or <) and exact-match probability.

**Odds panel adapts to mode**:
- Single die: current bar segments with fractions (unchanged)
- Two dice: a mini histogram showing the probability of each sum value (2–12), with the "higher" and "lower" regions shaded

**Streak persists across mode switches** — the mode change is a reward, not a reset.

## Risks / Trade-offs

- **Risk**: Two-dice mode is harder and might frustrate younger kids → Mitigation: it only appears after proving competence with a 5-streak
- **Risk**: Double-or-nothing could feel punishing → Mitigation: it's always optional, never forced, and the button text makes the risk clear
