## ADDED Requirements

### Requirement: Placement phase with 18 tokens
Before rolling begins the player SHALL distribute exactly 18 tokens across numbers 2–12 using tap +/− controls per row. The Roll button SHALL remain disabled until all 18 tokens are placed. A running total SHALL be displayed.

#### Scenario: Roll button locked until tokens placed
- **WHEN** the player has placed fewer than 18 tokens
- **THEN** the Roll button is disabled and the running total shows the remaining count

#### Scenario: Roll button unlocks at 18
- **WHEN** the player places their 18th token
- **THEN** the Roll button becomes active and a "Ready!" indicator appears

#### Scenario: Plus button disabled at total
- **WHEN** the total placed tokens equals 18
- **THEN** all plus buttons are disabled, preventing over-placement

### Requirement: Two bot opponents with distinct strategies
The game SHALL include two AI opponents: Lucky Larry (spreads tokens evenly across all numbers) and Max (distributes tokens proportional to the theoretical two-dice probability, concentrating on middle sums and placing 0 on 2 and 12).

#### Scenario: Bot boards visible during placement
- **WHEN** the player is placing tokens
- **THEN** Lucky Larry's and Max's token distributions are visible for comparison

#### Scenario: Bot strategies are distinguishable
- **WHEN** the player views the boards
- **THEN** Lucky Larry's board shows near-equal distribution and Max's board shows a triangle-shaped distribution with more tokens on 6, 7, 8

### Requirement: Simultaneous token removal on each roll
Each roll SHALL advance all three players simultaneously — the rolled sum's row flashes, then one token is removed from that row for every player who has tokens there. Players with no tokens on that number lose that roll.

#### Scenario: All players remove on matching sum
- **WHEN** dice roll sum N
- **THEN** the row for N flashes and one token is removed from each player's row N (if any remain there)

#### Scenario: No token — no removal
- **WHEN** dice roll sum N and a player has 0 tokens on N
- **THEN** that player's board is unchanged for that roll

### Requirement: First to clear all tokens wins
The game SHALL end immediately when any player reaches zero total tokens. If multiple players clear on the same roll, all are declared tied winners.

#### Scenario: Player wins
- **WHEN** the player's total tokens reach zero
- **THEN** a win celebration is shown and a Play Again button appears

#### Scenario: Bot wins
- **WHEN** a bot's total tokens reach zero before the player's
- **THEN** a loss message naming the winning bot is shown and a Play Again button appears

#### Scenario: Tie
- **WHEN** two or more players clear their boards on the same roll
- **THEN** a tie message is shown

### Requirement: Simulator unlocked after first game
After completing at least one game a simulator section SHALL unlock. The simulator SHALL run 100, 500, or 1000 games comparing three strategies: the player's last placement, Lucky Larry's spread, and Max's distribution. Results SHALL be shown as a bar chart of win rates with the player's bar highlighted.

#### Scenario: Simulator locked before first game
- **WHEN** the player has not completed a game
- **THEN** the simulator section is visible but dimmed with a hint to play first

#### Scenario: Simulator compares three strategies
- **WHEN** the player runs the simulator
- **THEN** a bar chart shows win rates for You, Lucky Larry, and Max
