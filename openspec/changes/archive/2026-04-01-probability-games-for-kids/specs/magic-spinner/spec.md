## ADDED Requirements

### Requirement: Visual pie-slice spinner
The game SHALL display a circular spinner divided into colored pie slices. Each slice represents one outcome. The spinner SHALL be visually attractive with distinct colors and labeled sections.

#### Scenario: Default spinner
- **WHEN** the game loads
- **THEN** a spinner with 4 equal-sized colored sections is displayed, each labeled with a name and percentage

### Requirement: Customizable slice sizes
The user SHALL be able to resize slices by adjusting size values using + / − controls (or a slider) next to each color. Slice sizes are relative weights (not percentages — the app converts). The spinner graphic SHALL update in real time.

#### Scenario: Resize a slice
- **WHEN** the user increases the weight of one color
- **THEN** that slice grows and all other slices shrink proportionally; the spinner redraws

#### Scenario: Minimum slice enforced
- **WHEN** a slice is at its minimum (weight = 1)
- **THEN** the decrease button for that slice is disabled

### Requirement: Add and remove slices
The user SHALL be able to add a new slice (up to 8 total) or remove an existing slice (minimum 2 slices). Each new slice receives a default color from a preset palette.

#### Scenario: Add a slice
- **WHEN** the user clicks "Add Section" and there are fewer than 8 slices
- **THEN** a new slice with a unique color and default weight appears in the spinner and controls

#### Scenario: Remove a slice
- **WHEN** the user clicks "Remove" on a slice and there are more than 2 slices
- **THEN** that slice is removed and remaining slices resize proportionally

### Requirement: Animated spin
When the user clicks "Spin!", the spinner SHALL play a smooth deceleration animation (at least 3 full rotations) before stopping on the randomly selected outcome. The outcome SHALL be determined proportionally to slice weights.

#### Scenario: Spin animation
- **WHEN** the user clicks "Spin!"
- **THEN** the spinner rotates with a deceleration easing for 2–4 seconds, stops on an outcome, and highlights the winning slice

#### Scenario: Button disabled during spin
- **WHEN** the spinner is currently spinning
- **THEN** the "Spin!" button is disabled until the animation completes

### Requirement: Spin history and probability display
The game SHALL track spin results and display: (a) a running count per outcome, (b) the actual frequency as a percentage, and (c) the theoretical probability per outcome. Both are shown in a results table and/or bar chart.

#### Scenario: Results update after spin
- **WHEN** a spin completes
- **THEN** the winning outcome's count and actual-frequency bar update immediately

### Requirement: Reset spins
The game SHALL include a Reset Spins button that clears spin history without changing the spinner configuration.

#### Scenario: Reset spins
- **WHEN** the user clicks "Reset Spins"
- **THEN** all spin tallies clear; spinner configuration is preserved

### Requirement: Bilingual content
All text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all spinner game text displays in Hebrew
