## ADDED Requirements

### Requirement: Live 2D random walk animation
The page SHALL display a 2D random walk on an SVG canvas where a dot moves one step (up/down/left/right) per tick, with the path drawn as a growing polyline.

#### Scenario: Walk starts
- **WHEN** the user presses Start
- **THEN** the dot begins moving randomly one step per tick and the path traces behind it

#### Scenario: Walk stops
- **WHEN** the user presses Stop or the walk reaches the step limit
- **THEN** the animation pauses and the current path remains visible

#### Scenario: Walk resets
- **WHEN** the user presses Reset
- **THEN** the dot returns to center and the path clears

### Requirement: Multiple walk overlays
The page SHALL allow the user to accumulate up to 10 past walk traces as faded colored overlays, showing how different random paths spread from the center.

#### Scenario: Overlay added
- **WHEN** the user completes a walk and starts a new one
- **THEN** the previous walk remains as a faded colored polyline behind the new live walk

#### Scenario: Overlay limit
- **WHEN** 10 overlays have accumulated
- **THEN** the oldest overlay is removed when a new walk is added

### Requirement: √n drift ring
The page SHALL display a circle around the origin with radius proportional to √(current step count), visualizing the expected drift distance.

#### Scenario: Ring grows with steps
- **WHEN** the walk advances
- **THEN** the ring's radius increases as √steps, showing where most walks are expected to reach

### Requirement: Step counter and distance display
The page SHALL show the current step count and the actual distance from the origin (Euclidean) in real time.

#### Scenario: Stats update
- **WHEN** the walk advances by one step
- **THEN** step count increments and distance updates to the current Euclidean distance from origin

### Requirement: ExplainerPanel
The page SHALL include an ExplainerPanel explaining the √n law and why random steps lead to predictable spread.

#### Scenario: Explainer present
- **WHEN** the user loads the page
- **THEN** the explainer is visible below the simulation

### Requirement: QuizPanel with 3 questions
The page SHALL include a QuizPanel with 3 questions about random walks and the √n drift law.

#### Scenario: Quiz available
- **WHEN** the user clicks Show Quiz
- **THEN** three questions appear covering expected distance, why paths look wild but spread is predictable, and real-world examples

### Requirement: Full EN/HE i18n
All text SHALL be translated under the `randomWalk.*` namespace.

#### Scenario: Language switch
- **WHEN** the user switches to Hebrew
- **THEN** all UI text displays in Hebrew with correct RTL layout
