### Requirement: 5-round session with procedural dice configs
Dice Detective SHALL run exactly 5 rounds per session. Each round SHALL generate a new randomised dice configuration (two dice, 4 faces each, 2–3 distinct shape types from {triangle, square, circle}). The configuration SHALL guarantee the counting answer is between 1 and 15 inclusive (never 0, never 16).

#### Scenario: New config each round
- **WHEN** a new round begins
- **THEN** die A and die B each show a freshly randomised set of 4 face shapes, potentially different from the previous round

#### Scenario: Non-trivial answer guaranteed
- **WHEN** a round is generated
- **THEN** the correct answer to the counting question is always between 1 and 15 inclusive

#### Scenario: Play Again reshuffles all rounds
- **WHEN** the player taps "Play Again" on the end screen
- **THEN** all 5 rounds are regenerated with new configs and questions

### Requirement: 4×4 sample space grid always visible
The game SHALL display all 16 outcomes as a 4×4 grid throughout the round. Each cell SHALL show the shape from die A and the shape from die B for that outcome. A header row (die B faces, blue) and header column (die A faces, red) SHALL label the grid axes.

#### Scenario: Grid renders all 16 cells
- **WHEN** a round is active
- **THEN** the grid shows exactly 16 cells, one per (die A face × die B face) combination

#### Scenario: Cell content matches dice
- **WHEN** die A has faces [🔺, 🔺, ⬛, ⭕] and die B has faces [🔺, ⬛, ⬛, ⭕]
- **THEN** cell (row 0, col 1) shows a triangle (from die A) paired with a square (from die B)

#### Scenario: Header labels match die faces
- **WHEN** the grid renders
- **THEN** column headers show die B's 4 faces in order (blue), row headers show die A's 4 faces in order (red)

### Requirement: Round progression — tap mode for rounds 1–2
Rounds 1 and 2 SHALL use tap mode. The player SHALL tap grid cells they believe match the counting condition, then submit. After submission the game SHALL highlight: correctly tapped cells in green, wrongly tapped cells in red, and missed correct cells in amber.

#### Scenario: Player taps cells and submits
- **WHEN** the player taps one or more cells and presses Submit
- **THEN** each tapped cell is classified as correct or wrong, each untapped correct cell is revealed as missed

#### Scenario: Submit disabled with no selection
- **WHEN** no cells have been tapped
- **THEN** the Submit button is disabled

#### Scenario: Perfect tap — all correct, none wrong
- **WHEN** the player taps exactly the correct set of cells
- **THEN** all tapped cells show green, no amber or red cells appear, and a "✓ Correct!" message is shown

#### Scenario: Partial tap — some correct, some missed
- **WHEN** the player taps a subset of correct cells and no wrong cells
- **THEN** tapped cells show green and untapped correct cells show amber

#### Scenario: Wrong tap — at least one incorrect cell
- **WHEN** the player taps at least one cell that does not match the condition
- **THEN** that cell shows red

### Requirement: Round progression — count mode for rounds 3–5
Rounds 3, 4, and 5 SHALL use count mode. The player SHALL type a whole number and submit. After submission the game SHALL highlight all matching cells in green and display the correct count. If the typed answer is wrong the input SHALL shake and the correct answer SHALL be shown immediately (no retry).

#### Scenario: Player types correct count
- **WHEN** the player types the correct number and submits
- **THEN** all matching cells highlight green, a "✓ Correct!" message appears, and the explanation line is shown

#### Scenario: Player types wrong count
- **WHEN** the player types an incorrect number and submits
- **THEN** the input shakes, the correct answer is displayed, and the matching cells highlight green anyway

#### Scenario: Submit disabled with empty input
- **WHEN** the count input is empty
- **THEN** the Submit button is disabled

### Requirement: 5 question templates, one per round
The game SHALL use exactly these templates in order: R1 ONE_DIE, R2 BOTH_SAME, R3 ONE_DIE, R4 AT_LEAST_ONE, R5 EXACTLY_ONE (or DIFFERENT_SHAPES if EXACTLY_ONE yields a trivial answer for the generated config).

#### Scenario: Round 1 asks about one die
- **WHEN** round 1 is active
- **THEN** the question asks how many outcomes show a specific shape on one specific die

#### Scenario: Round 4 asks at-least-one
- **WHEN** round 4 is active
- **THEN** the question asks how many outcomes include at least one instance of a specific shape

#### Scenario: Round 5 fallback to DIFFERENT_SHAPES
- **WHEN** round 5 generates a config where EXACTLY_ONE yields 0 or 16
- **THEN** the DIFFERENT_SHAPES template is used instead

### Requirement: One-line math explanation after each reveal
After every round reveal (both tap and count mode) a single explanation line SHALL show the arithmetic that produces the correct answer, using the actual counts from the generated dice configuration.

#### Scenario: Explanation shown after tap submission
- **WHEN** the player submits in tap mode
- **THEN** an explanation line appears below the grid showing the calculation (e.g. "3 × 4 = 12")

#### Scenario: Explanation shown after count submission
- **WHEN** the player submits in count mode
- **THEN** an explanation line appears below the grid showing the calculation

### Requirement: End screen with session score
After round 5 the game SHALL display an end screen showing how many rounds the player answered correctly on the first attempt, a short message, and a "Play Again" button.

#### Scenario: End screen shows correct count
- **WHEN** the player completes round 5
- **THEN** the end screen shows "N / 5 correct first time" where N is the count of rounds with a correct first submission

#### Scenario: Play Again returns to round 1
- **WHEN** the player taps "Play Again"
- **THEN** the game resets to round 1 with a fresh set of randomised configs

### Requirement: Full EN/HE i18n
All text in Dice Detective SHALL be internationalised under the `diceDetective.*` key namespace in both en.json and he.json. The game SHALL render correctly in RTL when Hebrew is active.

#### Scenario: Question renders in Hebrew
- **WHEN** the language is Hebrew
- **THEN** the question text, shape names, die colour labels, and explanation line all display in Hebrew with correct RTL alignment
