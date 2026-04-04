## Context

The app has 16 game pages following a consistent pattern: `GamePageLayout` wrapper, interactive game area, `ExplainerPanel`, `QuizPanel`. GreedyPig fits this pattern with one added complexity: the bot turn requires a `setTimeout`-based animation sequence (same pattern as GaltonBoard's `dropN` tick loop). All animation uses Framer Motion already in the bundle.

## Goals / Non-Goals

**Goals:**
- Strict alternating turns: player goes → bot goes → player goes → ...
- Live bot turn: each bot roll is animated with a deliberation pause before the decision to roll again or bank
- Configurable target [30, 50, 75, 100], default 50
- Bot threshold scales with target: `Math.round(target * 0.35)` — keeps the game fair at all target values
- Bust animation: dramatic flash + turn total drops to 0
- Bank animation: score counter increments with celebration
- Simulator unlocks after first completed game (same gate as Monty Hall)
- Simulator tests strategies: bank at [10, 15, 20, 25, 30] over N games
- Full EN + HE i18n, ExplainerPanel, QuizPanel

**Non-Goals:**
- Two-player hot seat mode (good v2 idea, out of scope now)
- Sound effects
- Saving game state across reloads
- Multiple bot difficulty levels (threshold is fixed at ~35% of target)

## Decisions

### 1. State machine with explicit phases

The turn structure has enough states that a string-based phase variable is cleaner than booleans:

```
PHASES:
  'player_turn'     — player sees Roll + Bank buttons
  'player_bust'     — brief bust animation (500ms), then → 'bot_turn_start'
  'bot_turn_start'  — "Bot's turn..." message (600ms pause), then → 'bot_rolling'
  'bot_rolling'     — bot rolls, decides, loops or banks
  'bot_bust'        — brief bot bust animation (500ms), then → 'player_turn'
  'bot_banking'     — brief bank celebration (600ms), then → check win
  'game_over'       — winner declared, play again button
```

**Why:** Explicit phases prevent impossible UI states (e.g., player pressing Roll during bot turn) without complex disabled-flag logic.

### 2. Bot turn as setTimeout chain (not setInterval)

Each bot action (roll → pause → decide → roll again or bank) is a one-shot `setTimeout` callback that schedules the next step. A `botActiveRef` flag (like `runningRef` in MonteCarloPi) guards against stale closures if the user resets mid-bot-turn.

**Why:** `setInterval` assumes fixed cadence; bot turn has variable timing (longer pause after a close call). `setTimeout` chains give full control.

### 3. Bot threshold scaled to target

`botThreshold = Math.round(target * 0.35)`

At target 50 → bank at ~18. At target 30 → bank at ~11. At target 100 → bank at ~35.

This is roughly aligned with the mathematically optimal strategy (which varies between 20–25% of target in most analyses). Slightly conservative makes the bot beatable without being trivial.

**Why:** A fixed threshold (e.g., always bank at 20) would make the bot trivially easy at target 30 and slightly unfair at target 100.

### 4. Die as animated component

A `Dieface` component renders the pip pattern for values 1–6 as a small grid of dots (pure CSS/Tailwind). On each roll it runs a brief Framer Motion "shake" animation before revealing the value.

**Why:** Emoji dice (🎲) don't show the actual number. A rendered die face makes the reveal more satisfying and the 1 (bust) visually distinct.

### 5. Simulator: run synchronously, display results

The simulator (N = 100 / 1000 / 10000 games per strategy) runs all simulations synchronously in a single JS tick (like `runSimulation` in MontyHall) — no animation needed, just number crunching. Results shown as a grouped or individual bar chart per strategy.

**Why:** Simulator is about the math, not the drama. Instant results are fine here; animation would distract.

### 6. Home page placement

Greedy Pig joins the existing "Explore More" section (the gradient card grid with House Always Wins, Birthday Room, etc.) rather than creating a third dark section. It fits thematically with that group — deeper, more strategic games.

**Why:** A third dark section for one game feels heavy. The gradient card pattern is already established and works well.

## Risks / Trade-offs

- **Bot turn interruption**: If player resets during bot's turn, `botActiveRef.current = false` cancels pending timeouts cleanly. Must be set before any state reset.
- **Animation timing on slow devices**: `setTimeout` delays are aesthetic, not functional. If the device is slow, they just feel slightly off — no correctness risk.
- **Simulator at 10,000 games**: ~10,000 × 5 strategies = 50,000 simulated turns. Pure JS, runs in < 50ms on any modern device. No chunking needed.

## Migration Plan

1. Add page + quiz file (no existing file changes needed until wiring)
2. Add i18n keys to en.json and he.json
3. Wire route in App.jsx
4. Add card to HomePage.jsx
5. Purely additive — no rollback risk
