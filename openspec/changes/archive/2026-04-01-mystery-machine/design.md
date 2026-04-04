## Context

The Mystery Machine is an inference game. The hidden machine is one of three types (candy jar, spinner, die) with randomly generated weights at game start. The player observes outputs and estimates the probabilities. A scoring function rewards closeness of estimates.

## Goals / Non-Goals

**Goals:**
- Three difficulty levels, each selecting machine type and trial budget
- "Produce one output" and "Produce ×10" buttons consume from the trial budget
- Output history shown as colored squares (candy jar) or labeled counts
- Player enters percentage estimates for each outcome (must sum to 100%)
- On submit: reveal the true probabilities, score the estimate, explain how close they were
- Score = 100 − average absolute error across all outcomes (e.g., true=50%, guessed=45% → error 5 pts)
- "Play again" generates a new hidden machine

**Non-Goals:**
- Multi-round scoring / leaderboard
- Saving high scores (no persistence)
- Guessing the machine type (only the probabilities)

## Decisions

### Decision 1: Hidden machine generation

On game start, randomly pick the number of outcomes (2–4) and assign random integer weights (1–10 each). Normalize to percentages internally. The player never sees the weights — only the outputs.

### Decision 2: Difficulty levels

| Level  | Outcomes | Trial budget | Machine feel      |
|--------|----------|--------------|-------------------|
| Easy   | 2        | 100          | Coin-like          |
| Medium | 3        | 60           | Candy jar          |
| Hard   | 4        | 40           | Spinner            |

### Decision 3: Estimate input UX

Sliders (0–100%) for each outcome, with a running total showing how many percentage points remain to allocate. Submit is disabled until total = 100%. Sliders auto-adjust others proportionally when one is dragged (optional — could also just show "total must equal 100%" error and let user fix manually; simpler to implement).

**Choice: Show error message and let user fix.** Simpler, no auto-adjust complexity.

### Decision 4: Scoring and feedback

After reveal, show a side-by-side table: Your Guess | True Value | Error. Each row color-coded by accuracy (green < 5%, yellow 5–15%, red > 15%). Final score prominently displayed.

## Risks / Trade-offs

- **Risk: Random machine is too easy or too hard** — For easy difficulty, ensure no outcome has < 20% true probability (avoids extreme imbalances with only 100 trials).
- **Risk: Player runs out of trials before forming any estimate** — Show a warning when 10 trials remain.
