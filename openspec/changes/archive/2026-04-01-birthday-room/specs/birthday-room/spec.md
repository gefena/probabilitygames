## ADDED Requirements

### Requirement: Room builder
The Birthday Room game SHALL let the user add people to a virtual room one at a time. Each person is assigned a random birthday (day 1–365). The room displays people as colored avatar circles, each labelled with their birthday number.

#### Scenario: Add person assigns random birthday
- **WHEN** the user clicks "Add Person"
- **THEN** a new avatar appears with a randomly assigned birthday (1–365)

#### Scenario: Room capped at 60 people
- **WHEN** 60 people are in the room
- **THEN** the "Add Person" button is disabled

### Requirement: Match detection and animation
The game SHALL detect when two people in the room share a birthday. When a match is found, both matching avatars SHALL be highlighted with a pulse animation and a "Match found!" banner SHALL appear.

#### Scenario: Match detected immediately on add
- **WHEN** the newly added person shares a birthday with any existing person
- **THEN** both matching avatars are highlighted and the match banner appears without any additional user action

### Requirement: Live probability meter
The game SHALL display the exact probability of at least one shared birthday for the current room size, computed analytically using the complement formula. The probability SHALL update after each person is added.

#### Scenario: 23-person milestone
- **WHEN** exactly 23 people are in the room
- **THEN** the probability meter shows approximately 50.7%

### Requirement: Probability curve chart
The game SHALL display a chart showing the birthday-match probability curve from 1 to 60 people. The current room size SHALL be marked on the curve.

#### Scenario: Curve marker updates
- **WHEN** the user adds a person
- **THEN** the marker on the probability curve moves to the new room size position

### Requirement: Simulation mode
The game SHALL offer a "Simulate" button that runs 1000 random rooms of the current room size and displays what percentage had at least one birthday match, alongside the exact probability for comparison.

#### Scenario: Simulation matches theory closely
- **WHEN** the user simulates 1000 rooms of 23 people
- **THEN** the simulation result is close to 50.7% (within normal random variation)

### Requirement: Reset
A "Clear Room" button SHALL reset the room to zero people and clear the match state.

#### Scenario: Clear room
- **WHEN** the user clicks "Clear Room"
- **THEN** all avatars are removed and the probability resets to 0%

### Requirement: Bilingual support
All text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all Birthday Room text displays in Hebrew with RTL layout
