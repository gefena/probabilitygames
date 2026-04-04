## ADDED Requirements

### Requirement: Animated ball drop simulation
The page SHALL display an animated Galton Board where balls fall through a triangular peg grid, bouncing left or right at each peg with equal probability, and collect in bins at the bottom.

#### Scenario: Single ball drop
- **WHEN** the user presses the ×1 button
- **THEN** one ball animates falling through the pegs and lands in a bin, incrementing the bin count

#### Scenario: Multi-ball drop
- **WHEN** the user presses ×10, ×100, or ×1000
- **THEN** the corresponding number of balls are dropped (staggered, max ~20 concurrent animated balls) and all land in bins

#### Scenario: Bell curve emergence
- **WHEN** enough balls have landed (≥50)
- **THEN** the histogram visually approximates a bell curve shape

### Requirement: Live histogram
The page SHALL display a live Recharts BarChart histogram that updates as each ball lands, showing the count per bin.

#### Scenario: Histogram updates in real-time
- **WHEN** a ball lands in a bin
- **THEN** that bin's bar grows immediately

#### Scenario: Histogram resets
- **WHEN** the user presses the Reset button
- **THEN** all bin counts return to zero and the animation area clears

### Requirement: ExplainerPanel
The page SHALL include an ExplainerPanel explaining why individual randomness produces a predictable bell curve shape.

#### Scenario: Explainer present
- **WHEN** the user loads the page
- **THEN** the explainer section is visible below the simulation

### Requirement: QuizPanel with 3 questions
The page SHALL include a QuizPanel with 3 questions about normal distributions and the Galton Board.

#### Scenario: Quiz available
- **WHEN** the user clicks Show Quiz
- **THEN** three quiz questions appear covering bell curves, independence of peg bounces, and the Central Limit Theorem concept

### Requirement: Full EN/HE i18n
All text on the page SHALL be translated using react-i18next keys under the `galtonBoard.*` namespace.

#### Scenario: Language switch
- **WHEN** the user switches language to Hebrew
- **THEN** all labels, buttons, and explanations display in Hebrew with correct RTL layout

### Requirement: Galton Board SVG bin-count labels removed
The per-bin numeric labels inside the Galton Board SVG (currently rendered as `<text>` elements capped at `'99+'`) SHALL be removed. The Recharts histogram below the SVG already shows exact counts on tooltip hover, making the SVG labels redundant and misleading at high drop counts.

#### Scenario: Dropping 1000 balls does not show truncated counts in the SVG
- **WHEN** the user drops 1000 balls
- **THEN** no `'99+'` or any other numeric label SHALL appear inside the SVG board area
- **AND** the histogram below SHALL still show correct counts and tooltip values

#### Scenario: Dropping 10 balls shows no SVG count labels
- **WHEN** the user drops 10 balls
- **THEN** no per-bin count labels SHALL appear in the SVG (labels are removed entirely, not just hidden at high counts)
