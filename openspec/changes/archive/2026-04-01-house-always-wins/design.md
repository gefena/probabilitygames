## Context

The House Always Wins page is a new educational section — less "game", more interactive explainer. It uses the same ExplainerPanel-style cards plus small simulators. Three real-world examples: lottery, slot machine, roulette. Each is self-contained.

The tone must be educational, not moralising. The goal is mathematical empowerment: "now you understand *why* these games are designed the way they are."

## Goals / Non-Goals

**Goals:**
- Three interactive "game cards", each covering one real-world game of chance
- Each card shows: the real odds, the real payout ratio, the house edge %, the expected value per play
- Each card has a mini-simulator: "spend N coins and see what you get back" with a chart
- A top-level "house edge" summary comparing all three side-by-side
- Bilingual (English + Hebrew)

**Non-Goals:**
- Full slot machine simulation with reels / animations (too complex, not educational)
- Real monetary amounts (use "coins" to keep it age-appropriate)
- More than 3 examples in the initial version

## Decisions

### Decision 1: The three examples and their math

**Lottery (simplified)**
- Pick 6 numbers from 1–49. Match all 6 to win jackpot.
- P(jackpot) = 1 in 13,983,816 ≈ 0.000007%
- Ticket cost: 10 coins. Jackpot: 5,000,000 coins. EV per ticket ≈ −9.64 coins (house edge ~96%).
- Simplified simulation: "buy 100 tickets, see how much you win back."

**Slot Machine (simplified)**
- 3 reels, each with 10 symbols. One jackpot symbol per reel.
- P(jackpot) = 1/10 × 1/10 × 1/10 = 1/1000
- Cost: 1 coin. Jackpot: 800 coins. EV = 0.8 coins (house edge 20%).
- Simulation: "spin 50 times".

**Roulette (European)**
- 37 numbers (0–36). Bet on a single number.
- P(win) = 1/37. Payout: 35:1 (win 35 coins, keep your 1).
- Net EV per 1-coin bet = (1/37 × 35) − (36/37 × 1) = −1/37 ≈ −0.027 coins. House edge 2.7%.
- Simulation: "bet on your lucky number 37 times".

### Decision 2: Simulator design

Each simulator is a compact version of the Prize Machine concept: a balance chart (Recharts Line) showing actual balance vs. expected-value trend. "Spin/Buy/Play" button and a ×10 multiplier. Starting balance: 50 coins.

### Decision 3: Page layout

```
┌─────────────────────────────────────────────────────────┐
│  🏦  Why The House Always Wins                           │
│  "Every casino game is designed with math. Here's how." │
├──────────────┬──────────────┬──────────────────────────┤
│  🎰 Slots    │  🎡 Roulette │  🎟 Lottery              │
│  House: 20%  │  House: 2.7% │  House: ~96%             │
│  [simulator] │  [simulator] │  [simulator]             │
├──────────────┴──────────────┴──────────────────────────┤
│  📊 House Edge Comparison Bar                           │
│  Slots ████████░░  20%                                  │
│  Roulette █░░░░░░░  2.7%                               │
│  Lottery  ████████████████████████ 96%                 │
└─────────────────────────────────────────────────────────┘
```

### Decision 4: Age-appropriate framing

Use "coins" not dollars. Avoid words like "gambling" in child-facing text — use "luck games" or "chance games". The callout box in each card reads something like: "Now you know the math! These games can be fun to learn about — but knowing the odds means you're never surprised."

## Risks / Trade-offs

- **Risk: Page feels heavy with 3 simulators** — Each simulator starts collapsed (just the stats shown). User expands to see the chart. Keeps initial page load light.
- **Risk: Lottery simulation with 1/14M odds never hits jackpot** — The lottery simulator shows a simplified version (1 in 1000 jackpot odds) to make jackpots occasionally visible while preserving the EV lesson. Label clearly as "simplified".
