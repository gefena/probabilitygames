## ADDED Requirements

### Requirement: Visual candy jar
The game SHALL display a large jar graphic filled with colorful animated candies (circles/dots in distinct colors). The jar SHALL visually reflect the current candy composition. When the total candy count is high (up to 60), candies SHALL scale down in size so they continue to fit inside the jar without overflowing.

#### Scenario: Jar renders candies
- **WHEN** the game loads with default composition (e.g., 5 red, 3 blue, 2 green)
- **THEN** the jar shows proportionally sized or positioned colored candies matching the counts

#### Scenario: Jar scales at high count
- **WHEN** the total candy count reaches 60 (3 colors × 20 max each)
- **THEN** all candies are smaller but still visible, and none overflow the jar boundary

### Requirement: Candy composition controls
The user SHALL be able to adjust the count of each color (minimum 0, maximum 20 per color, at least 1 candy total in the jar) using + / − buttons. The jar graphic SHALL update immediately when counts change.

#### Scenario: Add candies
- **WHEN** the user presses "+" next to a color
- **THEN** that color's count increases by 1 and the jar updates

#### Scenario: Remove candies
- **WHEN** the user presses "−" next to a color and the count is > 0
- **THEN** that color's count decreases by 1 and the jar updates

#### Scenario: Minimum total enforced
- **WHEN** all colors are at 0 except one with count 1
- **THEN** the "−" button for the last candy is disabled

### Requirement: Draw a candy
The user SHALL be able to "reach into" the jar and draw a candy. The drawn candy SHALL be selected randomly with probability proportional to each color's share of the total. The candy is returned to the jar after display (sampling with replacement).

#### Scenario: Draw result
- **WHEN** the user clicks "Draw!"
- **THEN** a candy of a random color pops out with an animation, and the drawn color's tally increases by 1

#### Scenario: Probability matches composition
- **WHEN** the jar has 8 red and 2 blue candies (total 10)
- **THEN** red is drawn approximately 80% of the time over many draws

### Requirement: Probability display
The game SHALL show the theoretical probability of drawing each color as both a fraction and a percentage, updating in real time as the composition changes.

#### Scenario: Probability fraction shown
- **WHEN** there are 3 red candies out of 10 total
- **THEN** the display shows "3/10 = 30%" for red

### Requirement: Draw history chart
The game SHALL track draw results and display a bar chart comparing actual draw frequency to theoretical probability for each color.

#### Scenario: Chart updates on draw
- **WHEN** a candy is drawn
- **THEN** that color's actual-frequency bar updates and theoretical-probability reference remains visible

### Requirement: Batch draw mode
The game SHALL allow the user to draw 10 or 100 candies at once using a selector (×1, ×10, ×100). Batch draws SHALL compute all results instantly and update the history chart in one step; only a single summary animation plays (not per-candy).

#### Scenario: Draw 10 at once
- **WHEN** the user selects "×10" and clicks Draw
- **THEN** 10 candies are drawn (with replacement), tallies update by 10, and a brief burst animation plays

#### Scenario: Draw 100 at once
- **WHEN** the user selects "×100" and clicks Draw
- **THEN** 100 candies are drawn instantly and the chart updates

### Requirement: Reset draws
The game SHALL include a Reset Draws button that clears draw history without changing the jar composition.

#### Scenario: Reset draws
- **WHEN** the user clicks "Reset Draws"
- **THEN** all draw tallies and the chart clear to zero; the jar composition is unchanged

### Requirement: Bilingual content
All text in the game SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all candy jar game text displays in Hebrew with RTL layout
