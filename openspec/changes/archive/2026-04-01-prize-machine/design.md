## Context

The project has five probability games built with React 18 + Vite + Tailwind CSS v3 + Framer Motion + Recharts + react-i18next. Each game page is self-contained with local state, an ExplainerPanel, and a QuizPanel. The Prize Machine is a new page following the same pattern.

## Goals / Non-Goals

**Goals:**
- Configurable prize table: up to 5 rows, each with a label, probability (%), and payout (coins)
- Cost-per-play input (default: 10 coins)
- Live expected value display as the table is edited: EV = Σ(payout × probability)
- Starting balance input (default: 100 coins)
- "Play ×1 / ×10 / ×100" buttons (same multiplier pattern as Coin Flip and Candy Jar)
- Balance chart (Recharts line) showing actual balance vs. EV trend line
- Reset button clears history but keeps prize table

**Non-Goals:**
- Persistent balance across page reloads
- Multiplayer / competitive mode
- Saving custom prize tables

## Decisions

### Decision 1: Prize table validation

Probabilities must sum to ≤ 100%. The remainder is implicitly "no prize". UI shows remaining % in real time. If user enters values summing to > 100%, the last row is capped. This avoids blocking the user mid-edit.

### Decision 2: EV display and sign convention

Show EV per play as **net** amount (payout − cost). If net EV is negative, label it red ("you lose X coins on average per play"). If positive, green. Zero: grey. This makes fairness immediately legible.

### Decision 3: Balance chart approach

Use a Recharts `LineChart` with two series: actual cumulative balance (updated after each play) and a reference line showing `startingBalance + (plays × netEV)`. The gap between the two lines shows luck vs. expectation. The reference line uses a dashed style.

### Decision 4: Default prize table

Default to a "rigged carnival game" feel: 
- 🏆 Jackpot: 1%, +200 coins
- 🎁 Big prize: 9%, +20 coins
- 🍬 Small prize: 30%, +5 coins
- 💨 Nothing: 60%, 0 coins
- Cost: 10 coins → EV = −3.5 coins/play

This immediately demonstrates a losing game without needing explanation.

## Risks / Trade-offs

- **Risk: Floating-point probability inputs** — Percentages are entered as integers (1–100). Internally stored as fractions. Outcome sampled via cumulative probability, same weighted-random pattern as Candy Jar.
- **Risk: Balance chart grows unbounded** — Cap display at last 200 plays on the x-axis, always showing the most recent window.
