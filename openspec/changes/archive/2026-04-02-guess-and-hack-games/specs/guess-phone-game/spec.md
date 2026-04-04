## ADDED Requirements

### Requirement: Configurable phone number length
The page SHALL offer length presets [1, 2, 3, 4, 5] digits, defaulting to 1. Selecting a new length SHALL reset the game and generate a new secret number.

#### Scenario: User changes length
- **WHEN** the user selects a different length preset
- **THEN** a new secret number of that length is generated and all guesses are cleared

#### Scenario: Default length on mount
- **WHEN** the page first loads
- **THEN** the default length is 1 digit and a secret is already generated

### Requirement: Secret number generation
The page SHALL generate a random N-digit number where each digit is independently chosen from 0–9.

#### Scenario: Secret has correct digit count
- **WHEN** the user starts a game of length N
- **THEN** the secret contains exactly N digits, each in range 0–9

### Requirement: Position-aware guessing
The player SHALL select an unresolved position and submit a single digit (0–9). A correct guess locks the position (shown in green). A wrong guess increments the attempt counter but does not reveal the answer.

#### Scenario: Correct digit guess
- **WHEN** the user guesses the correct digit for a position
- **THEN** that position is marked solved (green) and no longer selectable

#### Scenario: Wrong digit guess
- **WHEN** the user guesses an incorrect digit for a position
- **THEN** the attempt counter increments and the position remains unsolved

#### Scenario: All positions solved
- **WHEN** all N positions are marked solved
- **THEN** the win state is shown with a celebration animation and the total attempts taken

### Requirement: Probability display
The page SHALL display the remaining search space as "1 in X" where X = 10^(number of unsolved positions).

#### Scenario: Fresh game probability — length 1
- **WHEN** no positions have been solved in a 1-digit game
- **THEN** probability reads "1 in 10" (10^1)

#### Scenario: Fresh game probability — length 5
- **WHEN** no positions have been solved in a 5-digit game
- **THEN** probability reads "1 in 100,000" (10^5)

#### Scenario: Probability after one solved position
- **WHEN** one position is solved in a 3-digit game
- **THEN** probability reads "1 in 100" (10^2)

### Requirement: Guess history panel
The page SHALL display up to 10 most recent guesses as chips showing position, guessed digit, and ✓/✗ result.

#### Scenario: Guess chip display
- **WHEN** the user submits a guess
- **THEN** a chip is prepended to the history showing position number, the guessed digit, and hit/miss icon

### Requirement: Give-up action
The page SHALL provide a "Give Up" button that reveals the full secret and resets to a new game.

#### Scenario: Give up reveals secret
- **WHEN** the user clicks Give Up
- **THEN** all positions are revealed (showing the secret digits) before resetting to a new game

### Requirement: New game action
The page SHALL provide a "New Game" button that generates a fresh secret without changing the length setting.

#### Scenario: New game resets state
- **WHEN** the user clicks New Game
- **THEN** all positions are cleared, guess history is emptied, attempt counter resets to 0, and a new secret is generated at the same length
