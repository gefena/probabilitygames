
### Requirement: Configurable win target
The page SHALL offer win target presets [30, 50, 75, 100], defaulting to 50. Changing the target SHALL reset the game and recalculate the bot threshold.

#### Scenario: Default target on load
- **WHEN** the page first loads
- **THEN** the win target is 50 and a new game is ready

#### Scenario: User changes target
- **WHEN** the user selects a different target preset
- **THEN** the game resets and the bot threshold updates to Math.round(target × 0.35)

### Requirement: Player turn — roll and bank
During the player's turn the page SHALL display a Roll button and a Bank button. Rolling adds the die value (2–6) to the turn total. Banking adds the turn total to the permanent score and ends the player's turn. Rolling a 1 busts the turn.

#### Scenario: Player rolls 2–6
- **WHEN** the player clicks Roll and the die shows 2–6
- **THEN** the die value is added to the turn total and the Roll and Bank buttons remain active

#### Scenario: Player banks
- **WHEN** the player clicks Bank with a turn total > 0
- **THEN** the turn total is added to the player's permanent score, the turn total resets to 0, and the bot's turn begins

#### Scenario: Player busts (rolls 1)
- **WHEN** the player clicks Roll and the die shows 1
- **THEN** the turn total drops to 0 with a bust animation and the bot's turn begins

### Requirement: Live bot turn with animated decisions
The bot turn SHALL play out visually — each roll is animated, and the bot pauses to "decide" before rolling again or banking. The bot uses a banking threshold of Math.round(target × 0.35).

#### Scenario: Bot rolls and continues
- **WHEN** the bot's turn total is below its threshold and the last roll was 2–6
- **THEN** after a short pause (~700ms) the bot rolls again

#### Scenario: Bot banks
- **WHEN** the bot's turn total meets or exceeds its threshold
- **THEN** the bot displays a banking animation and adds the turn total to its permanent score

#### Scenario: Bot busts
- **WHEN** the bot rolls a 1
- **THEN** a bust animation plays and the bot's turn total resets to 0, returning control to the player

#### Scenario: Bot turn is not interruptible
- **WHEN** the bot's turn is in progress
- **THEN** the Roll and Bank buttons are disabled and the player cannot interact

### Requirement: Die face animation
The die SHALL display the rolled value as a pip pattern (not an emoji). Each roll SHALL play a brief shake animation before revealing the value.

#### Scenario: Die shows pip pattern
- **WHEN** a die value is revealed
- **THEN** the die face shows the correct number of pips arranged in the standard pattern for that face

#### Scenario: Value 1 is visually distinct
- **WHEN** the die shows 1 (bust)
- **THEN** the die face is styled in red to signal danger before the bust animation plays

### Requirement: Score display and win detection
Both the player's permanent score and the bot's permanent score SHALL be displayed at all times. When either score reaches or exceeds the target, the game SHALL enter the game-over state.

#### Scenario: Player wins
- **WHEN** the player's score reaches or exceeds the target after banking
- **THEN** a win celebration is shown and a Play Again button appears

#### Scenario: Bot wins
- **WHEN** the bot's score reaches or exceeds the target after banking
- **THEN** a loss message is shown and a Play Again button appears

### Requirement: Turn total display
The current turn's accumulated (unbanked) total SHALL be displayed prominently during any active turn, styled to convey it is at risk.

#### Scenario: Turn total is visible during player turn
- **WHEN** it is the player's turn
- **THEN** the turn total is displayed with a visual indicator that it is not yet safe

#### Scenario: Turn total resets on bust
- **WHEN** a bust occurs (player or bot)
- **THEN** the turn total animates to 0

### Requirement: Simulator (unlocked after first game)
After the player completes at least one full game, a simulator section SHALL unlock allowing N simulated games (100 / 1000 / 10000) across five banking strategies (bank at 10, 15, 20, 25, 30). Results are shown as a bar chart of win rates.

#### Scenario: Simulator locked before first game
- **WHEN** the player has not yet completed a game
- **THEN** the simulator section is visible but dimmed with a hint to play first

#### Scenario: Simulator runs and shows results
- **WHEN** the player selects a simulation size
- **THEN** all strategies are simulated and win rates are displayed in a bar chart

#### Scenario: Simulator highlights near-optimal strategy
- **WHEN** simulation results are shown
- **THEN** the bar with the highest win rate is visually highlighted
