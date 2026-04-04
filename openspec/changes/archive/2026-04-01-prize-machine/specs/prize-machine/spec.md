## ADDED Requirements

### Requirement: Prize table configuration
The Prize Machine game SHALL allow the user to configure a prize table with 1–5 rows. Each row SHALL have an editable label, a probability (integer 0–100), and a payout (integer, in coins). The sum of all probabilities SHALL be validated in real time; if it exceeds 100% the UI SHALL show an error and disable play. The implicit "no prize" outcome makes up the remainder.

#### Scenario: Add prize row
- **WHEN** the user clicks "Add Prize" and fewer than 5 rows exist
- **THEN** a new row appears with default label, 0% probability, and 0 payout

#### Scenario: Probability overflow warning
- **WHEN** the sum of all prize probabilities exceeds 100%
- **THEN** the UI shows a red warning and the Play button is disabled

### Requirement: Cost-per-play and starting balance
The game SHALL display a cost-per-play input (default 10 coins) and a starting balance input (default 100 coins). Both SHALL be editable before the first play. After the first play both inputs SHALL be locked until Reset.

#### Scenario: Inputs locked after first play
- **WHEN** the user plays at least once
- **THEN** the cost and starting balance inputs become read-only

### Requirement: Expected value display
The game SHALL compute and display the expected value per play (net of cost) in real time as the prize table is edited. The EV SHALL be shown in red if negative, green if positive, grey if zero.

#### Scenario: Negative EV shown in red
- **WHEN** the configured prize table yields a net EV of −3.5 coins per play
- **THEN** the EV display shows "−3.5 coins/play" in red

### Requirement: Play and balance tracking
The game SHALL support playing ×1, ×10, or ×100 at once. After each play (or batch), the current balance SHALL update and the balance chart SHALL extend.

#### Scenario: Balance decreases on average
- **WHEN** the player plays 100 times on a negative-EV machine
- **THEN** the balance chart shows the actual balance trending toward the EV trend line (below starting balance)

#### Scenario: Balance chart shows EV trend line
- **WHEN** plays have been made
- **THEN** the chart displays both the actual balance line and a dashed EV trend line

### Requirement: Reset
The game SHALL include a Reset button that clears play history and restores the starting balance, without changing the prize table.

#### Scenario: Reset preserves prize table
- **WHEN** the user clicks Reset
- **THEN** balance returns to starting value, chart clears, play count resets to zero, prize table is unchanged

### Requirement: Bilingual support
All labels, button text, and explainer content SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all Prize Machine text displays in Hebrew with RTL layout
