## ADDED Requirements

### Requirement: Canvas dart simulation
The page SHALL render a square with an inscribed circle on an HTML5 Canvas, and animate random darts landing inside or outside the circle, colored differently for each case.

#### Scenario: Darts land
- **WHEN** the simulation is running
- **THEN** colored dots appear on the canvas — one color for inside the circle, another for outside

#### Scenario: Canvas fills progressively
- **WHEN** the simulation reaches 10,000 darts
- **THEN** the canvas is dense with dots and π estimate is stable to ~2 decimal places

### Requirement: Live π approximation display
The page SHALL display the current π approximation (4 × inside / total) updating in real time, formatted to 5 decimal places, color-coded by accuracy.

#### Scenario: Accurate approximation
- **WHEN** the estimate is within 0.01 of Math.PI
- **THEN** the display shows the value in green

#### Scenario: Close approximation
- **WHEN** the estimate is within 0.1 of Math.PI
- **THEN** the display shows the value in yellow/amber

#### Scenario: Inaccurate approximation
- **WHEN** the estimate differs from Math.PI by more than 0.1
- **THEN** the display shows the value in red

### Requirement: Simulation controls
The page SHALL provide Start, Pause, and Reset buttons, plus a speed selector (slow / fast / instant).

#### Scenario: Pause and resume
- **WHEN** the user pauses and then resumes
- **THEN** the simulation continues from where it left off without resetting

#### Scenario: Instant mode
- **WHEN** the user selects instant speed
- **THEN** 10,000 darts are computed and drawn at once without animation delay

### Requirement: Dart count and ratio display
The page SHALL show total darts thrown, count inside circle, count outside, and the inside/total ratio.

#### Scenario: Stats update
- **WHEN** each dart lands
- **THEN** all four counters update immediately

### Requirement: ExplainerPanel
The page SHALL include an ExplainerPanel explaining why π = 4 × (circle area / square area) and how sampling approximates it.

#### Scenario: Explainer present
- **WHEN** the user loads the page
- **THEN** the explainer is visible below the simulation

### Requirement: QuizPanel with 3 questions
The page SHALL include a QuizPanel with 3 questions about Monte Carlo methods and π.

#### Scenario: Quiz available
- **WHEN** the user clicks Show Quiz
- **THEN** three questions appear covering why the formula works, convergence behavior, and Monte Carlo applications

### Requirement: Full EN/HE i18n
All text SHALL be translated under the `monteCarloPi.*` namespace.

#### Scenario: Language switch
- **WHEN** the user switches to Hebrew
- **THEN** all UI text displays in Hebrew with correct RTL layout

### Requirement: MonteCarloPi instant-mode respects pause between dart batches
The `runChunk` function SHALL check `runningRef.current` before adding each dart (or at minimum before processing each batch), so that clicking Pause stops the simulation within one batch rather than completing the entire current chunk.

#### Scenario: User pauses during instant-mode simulation
- **WHEN** the user clicks Pause while the simulation is running in instant mode
- **THEN** no more than one full batch of darts SHALL be added after the pause click is registered
- **AND** the dart count displayed SHALL stop incrementing within that batch

#### Scenario: Instant-mode reaches 100,000 darts and auto-stops
- **WHEN** the total dart count reaches 100,000 in instant mode
- **THEN** the simulation SHALL stop automatically as before (no regression)
