## Context

Three small, focused extensions to existing game pages. Each adds one mode or editor without restructuring the page. All follow the existing toggle/tab pattern used for dice count and coin flip multiplier.

## Goals / Non-Goals

**Goals:**
- Candy Jar: "No Refill" toggle — when on, drawn candies are removed from the jar; jar composition and probabilities update after each draw; empty jar shows a "refill" prompt
- Magic Spinner: "Two Rounds" mode — spin twice; after Round 1 the bracket is set; after Round 2 the winner is determined; a two-level tree diagram shows the path taken
- Lucky Dice: Custom Die tab — 6 face inputs (integer 1–99 each); distribution chart updates live; a "reset to standard" button restores 1–6

**Non-Goals:**
- Saving custom configurations
- More than one custom die at a time
- Two-Rounds mode for > 2 outcomes (tree becomes unwieldy)

## Decisions

### Candy Jar — No Refill mode

When No Refill is active:
- Each draw removes one candy of the drawn color from the `colors` state (decrement count)
- If a color reaches 0, it is grayed out in the probability panel
- If all colors reach 0, show "Jar is empty — refill to draw again"
- Reset Draws button also refills the jar to the configured composition
- The ExplainerPanel body text changes to mention "without replacement"

The `colors` state array already tracks counts; this is a small modification to the `draw` function and a new `noRefill` boolean state.

### Magic Spinner — Two Rounds mode

Two-Rounds mode runs two independent spins. State: `round` (1 or 2), `round1Result`, `round2Result`.

The tree diagram is an SVG with:
- Root node → N branches (one per slice) for Round 1
- Each Round 1 branch → N branches for Round 2
- After Round 1: highlight the taken branch; dim others
- After Round 2: highlight the full path; show combined probability

Limit to the current spinner configuration (max 8 slices). With 8 slices the tree has 64 leaves — render only the top 4 slices' branches to avoid visual overload. Or: only show the tree for ≤ 4 slices; show a text summary for more.

**Choice: Show tree only when ≤ 4 slices; show text path otherwise.**

### Lucky Dice — Custom Die

Add a "Custom" tab next to the 1 / 2 / 3 dice count selector. In Custom mode:
- 6 number inputs (one per face), default values 1–6
- The existing `sumProbabilities` logic adapts: instead of uniform faces, weight each face by its value... actually no — the faces ARE the values, not weights. Custom die changes the face *values* (not frequency).
- The distribution chart for 1 custom die shows frequency = 1/6 for each face (always equal, since a die has one of each face) but the x-axis shows the custom values.
- For 2+ custom dice: compute sum distribution using the custom face values.

This lets kids build a die with faces like [1, 1, 2, 3, 5, 8] and see how sums distribute.

## Risks / Trade-offs

- **Risk: No-refill + batch draw** — Batch draws (×10, ×100) with no-refill must check remaining candy count at each step. If the jar empties mid-batch, stop early and report how many were actually drawn.
- **Risk: Custom die with duplicate values** — Allowed (e.g., [1,1,1,2,3,6]). The distribution chart groups by value and sums frequencies.
