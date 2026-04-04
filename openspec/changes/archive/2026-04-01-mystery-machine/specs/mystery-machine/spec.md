## ADDED Requirements

### Requirement: Hidden machine setup
The Mystery Machine game SHALL generate a hidden probability machine at game start. The machine has 2–4 outcomes with randomly assigned weights (not revealed to the player). The number of outcomes and trial budget depend on the chosen difficulty level.

#### Scenario: Easy difficulty
- **WHEN** the player selects Easy
- **THEN** the machine has 2 outcomes and the player receives 100 trials

#### Scenario: Hard difficulty
- **WHEN** the player selects Hard
- **THEN** the machine has 4 outcomes and the player receives 40 trials

### Requirement: Trial output
The game SHALL display a "Produce output" button (and ×10 multiplier) that consumes from the trial budget and shows the machine's output. A running tally of observed outputs SHALL update after each trial.

#### Scenario: Trial budget decreases
- **WHEN** the player uses 10 trials
- **THEN** the remaining trial count decreases by 10

#### Scenario: Low trial warning
- **WHEN** 10 or fewer trials remain
- **THEN** the game displays a "Running low on trials!" warning

#### Scenario: No output when budget exhausted
- **WHEN** the trial budget reaches 0
- **THEN** the produce button is disabled and the player must submit their estimate

### Requirement: Estimate submission
The game SHALL display percentage sliders for each outcome. The player adjusts sliders to estimate the hidden probabilities. The submit button SHALL be enabled only when all sliders sum to exactly 100%.

#### Scenario: Submit blocked when total ≠ 100%
- **WHEN** the slider totals do not equal 100%
- **THEN** the Submit button is disabled and a "Total must equal 100%" message is shown

### Requirement: Reveal and scoring
On submit, the game SHALL reveal the true hidden probabilities side-by-side with the player's estimates. A score (0–100) is computed as 100 minus the average absolute error across all outcomes.

#### Scenario: Perfect estimate scores 100
- **WHEN** the player's estimates match the true probabilities exactly
- **THEN** the score displays as 100

#### Scenario: Result comparison table
- **WHEN** the reveal is shown
- **THEN** a table shows each outcome with columns: Your Guess, True Value, Difference — color-coded green/yellow/red by accuracy

### Requirement: Play again
After the reveal, a "Play Again" button SHALL generate a new hidden machine at the same difficulty level.

#### Scenario: Play again resets state
- **WHEN** the user clicks "Play Again"
- **THEN** a new machine is generated, the tally clears, sliders reset to 0%, and the trial budget resets

### Requirement: Bilingual support
All text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all Mystery Machine text displays in Hebrew with RTL layout
