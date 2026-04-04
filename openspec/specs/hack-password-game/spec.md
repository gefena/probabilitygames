### Requirement: Configurable password length
The page SHALL offer length presets [1, 2, 3, 4, 5] characters, defaulting to 1. Selecting a new length SHALL reset the game and generate a new secret password.

#### Scenario: User changes length
- **WHEN** the user selects a different length preset
- **THEN** a new secret password of that length is generated and all guesses are cleared

### Requirement: Difficulty selector (alphabet size)
The page SHALL offer three difficulty tiers that control the character alphabet:
- **Easy**: digits 0–9 (alphabet size 10)
- **Medium**: lowercase a–z + digits 0–9 (alphabet size 36)
- **Hard**: lowercase a–z + uppercase A–Z + digits 0–9 (alphabet size 62)

Changing difficulty SHALL reset the game.

#### Scenario: Easy difficulty alphabet
- **WHEN** Easy is selected
- **THEN** the character picker shows only digits 0–9 and the secret uses only those characters

#### Scenario: Hard difficulty alphabet
- **WHEN** Hard is selected
- **THEN** the character picker shows all 62 alphanumeric characters and the secret uses them

### Requirement: Secret password generation
The page SHALL generate a random M-character password where each character is independently chosen from the active alphabet.

#### Scenario: Secret has correct length
- **WHEN** the user starts a game of length M with a given difficulty
- **THEN** the secret contains exactly M characters, each drawn from the active alphabet

### Requirement: Character picker UI
Instead of a text input, the player SHALL select characters from a rendered grid of buttons showing the full active alphabet. This avoids mobile keyboard issues.

#### Scenario: Character grid renders active alphabet
- **WHEN** the game is active
- **THEN** a grid of clickable character buttons is displayed showing all characters in the active alphabet

#### Scenario: Submitting a character guess
- **WHEN** the user clicks a character in the grid and a position is selected
- **THEN** the guess is submitted for that position

### Requirement: Position-aware guessing
The player SHALL select an unresolved position, then tap a character in the grid to guess. A correct guess locks the position (green). A wrong guess increments the attempt counter.

#### Scenario: Correct character guess
- **WHEN** the user guesses the correct character for a position
- **THEN** that position is marked solved (green) and the character is displayed

#### Scenario: Wrong character guess
- **WHEN** the user guesses an incorrect character for a position
- **THEN** the attempt counter increments and the position remains unsolved

#### Scenario: All positions solved
- **WHEN** all M positions are solved
- **THEN** the win state is shown with celebration animation and total attempts

### Requirement: Probability and search space display
The page SHALL display:
1. Remaining combinations: alphabet_size^(unsolved positions)
2. A comparison label (e.g. "More than stars in the Milky Way") when combinations exceed 1 billion

#### Scenario: Initial search space — Hard/5-char
- **WHEN** no positions are solved on Hard difficulty with 5 characters
- **THEN** the display shows 62^5 = ~916 million combinations

#### Scenario: Search space comparison label
- **WHEN** the remaining combinations exceed 1 billion
- **THEN** a friendly comparison label is shown to make the scale relatable

### Requirement: Guess history panel
The page SHALL display up to 10 most recent guesses as chips showing position, character, and ✓/✗.

#### Scenario: Guess chip display
- **WHEN** the user submits a guess
- **THEN** a chip is prepended showing position, guessed character, and hit/miss icon

### Requirement: Give-up and New Game actions
Give Up reveals the secret before resetting; New Game resets without changing length/difficulty settings.

#### Scenario: Give up reveals secret
- **WHEN** the user clicks Give Up
- **THEN** all positions show the actual secret characters before resetting

#### Scenario: New game preserves settings
- **WHEN** the user clicks New Game
- **THEN** length and difficulty are preserved, a new secret is generated, guesses are cleared

### Requirement: Hard mode displays a character disambiguation hint
When `difficulty === 'hard'`, the Hack the Password game SHALL show a visible note near the character input grid informing the student that the charset contains visually similar characters (`0` vs `O`, `1` vs `l` vs `I`).

#### Scenario: Hard mode hint is visible before guessing begins
- **WHEN** the user selects Hard difficulty
- **THEN** a short hint such as "Note: includes 0 (zero) vs O (letter) and 1 (one) vs l (letter)" SHALL be visible near the character grid

#### Scenario: Hint is absent in Easy and Medium modes
- **WHEN** the user selects Easy or Medium difficulty
- **THEN** the disambiguation hint SHALL NOT be shown (those alphabets have no ambiguous pairs)

#### Scenario: Hint does not obstruct gameplay
- **WHEN** the hint is visible
- **THEN** it SHALL be displayed as non-intrusive secondary text (small, subdued color) that does not overlap the character grid or the position display
