## ADDED Requirements

### Requirement: Streak Hunter mode
The Coin Flip page SHALL offer a "Streak Hunter" mode toggle alongside the existing "Flip Lab" mode. In Streak Hunter mode the flip mechanic is unchanged but the UI replaces the statistics panel with streak-focused displays.

#### Scenario: Mode toggle switches UI
- **WHEN** the user switches to Streak Hunter mode
- **THEN** the statistics panel is hidden and the streak display appears; the flip button and multiplier remain visible

### Requirement: Flip history sequence
In Streak Hunter mode the game SHALL display the flip history as a scrolling row of colored squares (purple = heads, pink = tails), capped at the last 100 flips. The row SHALL auto-scroll to show the most recent flip.

#### Scenario: History shows last 100 flips
- **WHEN** more than 100 flips have been made
- **THEN** only the 100 most recent flips are shown in the sequence row

### Requirement: Current streak display
The game SHALL prominently display the current streak type (Heads or Tails) and its length, updating after every flip.

#### Scenario: Streak resets on break
- **WHEN** the result changes from the current streak type
- **THEN** the current streak counter resets to 1 with the new type

### Requirement: Streak prediction
Before each flip, the game SHALL present two prediction buttons: "Streak continues" and "Streak breaks". The player must choose before the flip result is revealed. After the result, the prediction is evaluated and the score updates (+1 for correct, +0 for wrong). The prediction buttons are disabled after choosing and re-enabled for the next flip.

#### Scenario: Correct prediction scores a point
- **WHEN** the player predicts "streak breaks" and the next flip does break the streak
- **THEN** the score increments by 1

#### Scenario: Prediction required before flip
- **WHEN** no prediction has been made for the current flip
- **THEN** the Flip button is disabled

### Requirement: Streak length histogram
The game SHALL display a bar chart showing how many streaks of each length (1, 2, 3, …) have occurred. Only lengths that have been observed SHALL be shown.

#### Scenario: Histogram updates after streak ends
- **WHEN** a streak of length 4 ends
- **THEN** the bar for length 4 increments by 1

### Requirement: Bilingual support
All Streak Hunter mode text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all streak mode text displays in Hebrew
