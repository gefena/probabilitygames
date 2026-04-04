## ADDED Requirements

### Requirement: Manual play phase (required before simulation)
The page SHALL require the user to play at least 1 manual round before the batch simulator is unlocked, so they experience the intuitive wrongness before seeing the statistics.

#### Scenario: First visit — simulator locked
- **WHEN** the user loads the page
- **THEN** the batch simulator section is hidden or disabled

#### Scenario: After first manual game — simulator unlocked
- **WHEN** the user completes 1 manual round (pick a door, decide switch or stay, see result)
- **THEN** the batch simulator section becomes visible and enabled

### Requirement: Interactive door selection
The page SHALL display 3 doors. The user picks one, the host reveals a goat behind one of the other two, and the user then chooses to switch or stay.

#### Scenario: Pick a door
- **WHEN** the user clicks a door
- **THEN** the door is highlighted as selected and a host-reveal door is animated open to show a goat

#### Scenario: Switch or stay
- **WHEN** the host has revealed a goat
- **THEN** two buttons appear: "Stay" and "Switch"

#### Scenario: Result reveal
- **WHEN** the user picks Stay or Switch
- **THEN** all doors open to reveal their contents, and the result (win/lose) is shown with animation

### Requirement: Manual round statistics
The page SHALL track and display switch wins, switch losses, stay wins, stay losses across all manual rounds played.

#### Scenario: Stats accumulate
- **WHEN** the user plays multiple manual rounds
- **THEN** the win/loss tally for each strategy updates after each round

### Requirement: Batch simulator
The page SHALL provide a simulator that runs N games (100 / 1000 / 10000) instantly, split evenly between always-switch and always-stay strategies, and displays results as a bar chart.

#### Scenario: Run simulation
- **WHEN** the user presses "Simulate 1000 games"
- **THEN** results appear immediately showing ~667 switch wins vs ~333 stay wins as color-coded bars

#### Scenario: Results match theory
- **WHEN** simulation runs ≥1000 games
- **THEN** switch win rate converges to ~66.7% and stay win rate to ~33.3%

### Requirement: ExplainerPanel
The page SHALL include an ExplainerPanel explaining conditional probability — why the host's action gives information that changes the odds.

#### Scenario: Explainer present
- **WHEN** the user loads the page
- **THEN** the explainer is visible below the simulation

### Requirement: QuizPanel with 3 questions
The page SHALL include a QuizPanel with 3 questions about the Monty Hall problem.

#### Scenario: Quiz available
- **WHEN** the user clicks Show Quiz
- **THEN** three questions appear covering switch probability (2/3), why it's not 50/50, and the host's role in providing information

### Requirement: Full EN/HE i18n
All text SHALL be translated under the `montyHall.*` namespace.

#### Scenario: Language switch
- **WHEN** the user switches to Hebrew
- **THEN** all UI text displays in Hebrew with correct RTL layout
