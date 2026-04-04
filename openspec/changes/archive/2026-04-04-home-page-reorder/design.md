## Context

The `HomePage.jsx` component defines the order of games in the `TIERS` array. This order should represent a natural learning curve for users.

## Goals / Non-Goals

**Goals:**
- Reorder games to progress from simple/easy to complex/hard.
- Group related games within tiers (e.g., games using two-dice sums together).

**Non-Goals:**
- No changes to the game content itself.
- No changes to the tier categories (Start Here, Go Deeper, etc.).

## Decisions

- **Tier 1 (Start Here) Reorder**: Prioritize the most immediate "tap once" games first.
  - Coin Flip, Lucky Dice, Candy Jar, Magic Spinner, Higher or Lower, Card Draw.
- **Tier 2 (Go Deeper) Reorder**: Group by concepts and complexity.
  - Race games first: Roll & Race.
  - Visual counting/combinations: Dice Detective, Pizza Builder.
  - Strategy games: Remove One, Probability Bingo.
  - Advanced rules: Climber Race (Addition), Bridge Quest (Multiplication).
  - Risk and Strategy: Greedy Pig.
  - Explorer tools: Lucky Combo.
  - Money and EV: House Always Wins, Prize Machine.
- **Tier 4 (Patterns in Chaos) Reorder**: Move the most abstract game ("Mystery Machine") to the end.

## Risks / Trade-offs

- [Risk] → Reordering may confuse returning users.
  - [Mitigation] → The visually distinct emojis and colors help users quickly find what they are looking for.
