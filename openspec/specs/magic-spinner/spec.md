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

### Requirement: Spinner explainer panel
The game SHALL display an explainer panel that teaches the user about spinner probability. The panel SHALL be visible on load, update its live example when slice weights change, update when slices are added or removed, and be available in both English and Hebrew.

#### Scenario: Visible on load
- **WHEN** the game loads
- **THEN** the explainer panel is visible without any user interaction, showing introductory probability text based on the default spinner configuration

#### Scenario: Live example updates on weight change
- **WHEN** the user adjusts the weight of any slice
- **THEN** the explainer panel's live example updates to reference the new probability percentages for the affected slices

#### Scenario: Updates on slice add/remove
- **WHEN** the user adds or removes a slice
- **THEN** the explainer panel updates its content to reflect the new number of slices and their proportions

#### Scenario: Bilingual
- **WHEN** the global language is switched between English and Hebrew
- **THEN** all explainer panel text displays in the selected language

### Requirement: Magic spinner quiz
The magic spinner game SHALL include a QuizPanel below the explainer, with a question bank that tests understanding of weighted probability and comparing slice chances.

The question bank SHALL contain at least 3 questions covering:
1. **Relative weight**: Spinner has slice A weight=3, B weight=1, C weight=2. Total = 6. What is A's probability? (3/6 = 50%)
2. **Fair spinner test**: Which spinner is fair — A) all slices weight 1, B) slices weight 1/2/3, C) slices weight 2/2/2?
3. **Doubling a slice**: Slice A has weight 1, B weight 1. You change A to weight 2. Is A now twice as likely to win as B? (Yes — 2/3 vs 1/3)

#### Scenario: Quiz appears below explainer
- **WHEN** the magic spinner page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel

#### Scenario: Weight fraction question links to current spinner
- **WHEN** the user answers the relative-weight question
- **THEN** the explanation invites the user to set those weights on the live spinner and observe the percentages shown on the slices

#### Scenario: Fair spinner question reinforces callout
- **WHEN** the user answers the fair spinner test
- **THEN** the explanation connects to the amber callout: equal weights = equal chances

### Requirement: Prize Machine explainer uses age-appropriate examples
The Prize Machine explainer `example` field SHALL express expected value in terms of "play N times and expect to lose/gain X coins total" rather than presenting a multi-step decimal multiplication chain.

#### Scenario: EV explainer example
- **GIVEN** the user reads the ExplainerPanel on PrizeMachinePage
- **WHEN** they read the `example` text
- **THEN** the example describes the outcome over 100 plays in plain language
- **AND** does not require the reader to multiply decimal probabilities
