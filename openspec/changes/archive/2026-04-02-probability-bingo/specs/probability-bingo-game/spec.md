## ADDED Requirements

### Requirement: 3×3 grid with default balanced-random card
The game SHALL present a 3×3 grid pre-filled with a balanced-random card that guarantees at least one number from {5,6,7,8,9} per row and per column. The player SHALL be able to start rolling immediately without editing.

#### Scenario: Default card is immediately playable
- **WHEN** a user opens the game
- **THEN** a pre-filled 3×3 grid is shown and the Roll button is enabled

#### Scenario: Default card contains playable numbers
- **WHEN** the default card is generated
- **THEN** every row and column contains at least one number from {5, 6, 7, 8, 9}

### Requirement: Edit card mode
The player SHALL be able to tap any grid square to replace its number via a number picker showing 2–12 with probability hints. Editing is available only before rolling begins.

#### Scenario: Player enters edit mode
- **WHEN** the player taps the Edit Card button before rolling
- **THEN** each grid square becomes tappable and shows a selection indicator

#### Scenario: Number picker shows probability hints
- **WHEN** the player taps a square in edit mode
- **THEN** a number picker appears showing all sums 2–12, each with a visual probability bar proportional to its likelihood

#### Scenario: Square updated with chosen number
- **WHEN** the player selects a number from the picker
- **THEN** the tapped square displays the new number and the picker closes

#### Scenario: Edit mode unavailable during rolling
- **WHEN** rolling has started (phase is rolling or finished)
- **THEN** the Edit Card button is not shown

### Requirement: Two bot opponents with distinct strategies
The game SHALL include Lucky Larry (random fill) and Probability Pete (packs 6/7/8 into one row and 5/7/9 into one column for maximum expected line speed). Both grids SHALL be visible to the player throughout the game.

#### Scenario: Bot grids visible during play
- **WHEN** rolling is in progress
- **THEN** Lucky Larry's and Probability Pete's grids are visible alongside the player's grid

#### Scenario: Pete's grid is strategically concentrated
- **WHEN** the player views Pete's grid
- **THEN** one row contains high-probability sums (6, 7, 8) and one column contains a second fast-line path

### Requirement: Simultaneous cross-out and bingo check
On each roll, all matching squares across all three grids SHALL be crossed out simultaneously. The win check SHALL run synchronously after computing new crossed states.

#### Scenario: All grids update on each roll
- **WHEN** dice sum N is rolled
- **THEN** every square showing N is crossed out across the player's, Larry's, and Pete's grids

#### Scenario: Bingo declared on first completed line
- **WHEN** any player completes a row, column, or diagonal
- **THEN** that player is declared the winner and rolling stops

#### Scenario: Simultaneous bingo is a tie
- **WHEN** two or more players complete a line on the same roll
- **THEN** a tie is declared

### Requirement: Near-bingo line highlighting
During the rolling phase, any row, column, or diagonal in the player's grid that has exactly one uncrossed square SHALL be visually highlighted to signal "almost there".

#### Scenario: Hot line highlighted when one square remains
- **WHEN** a line in the player's grid has exactly one uncrossed square
- **THEN** that line's squares are highlighted with an amber indicator

#### Scenario: Highlight cleared when line completes or roll changes state
- **WHEN** the final square in a highlighted line is crossed out
- **THEN** the highlight transitions to a bingo celebration for that line

### Requirement: Post-game board reveal
After the game ends, all three grids SHALL be shown simultaneously with their crossed-out squares, so the player can compare strategies.

#### Scenario: All grids shown after game ends
- **WHEN** a winner is declared
- **THEN** all three grids (player, Larry, Pete) are visible with crossed-out squares and the winning line highlighted

### Requirement: Simulator unlocked after first game
After completing at least one game, a simulator section SHALL unlock. The simulator SHALL run 100, 500, or 1000 games comparing the player's last card, Lucky Larry's random fill, and Pete's fixed grid. Results SHALL be shown as a bar chart of win rates with the player's bar highlighted.

#### Scenario: Simulator locked before first game
- **WHEN** the player has not completed a game
- **THEN** the simulator is visible but dimmed with a hint to play first

#### Scenario: Simulator compares three strategies
- **WHEN** the player runs the simulator
- **THEN** a bar chart shows win rates for the player's card, Larry's random average, and Pete's fixed grid
