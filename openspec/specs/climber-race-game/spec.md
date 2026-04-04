## ADDED Requirements

### Requirement: Four named climbers race to summit
The ClimberRacePage SHALL display four named climbers — Sunny (🟡), Blaze (🔴), Storm (🔵), Ivy (🟢) — racing up a mountain in a fixed 6-step race. The first climber to reach step 6 wins.

#### Scenario: Mountain shows all four climbers
- **WHEN** the user starts a race
- **THEN** four climber tracks are visible, two on the left column (Sunny, Blaze) and two on the right column (Storm, Ivy), each starting at step 0

#### Scenario: Climber advances on winning spin
- **WHEN** a spin resolves and climber X is the winner
- **THEN** climber X advances exactly one step on the mountain display

#### Scenario: Race ends when first climber reaches step 6
- **WHEN** a climber's step count reaches 6
- **THEN** the race ends and a win/lose result message is shown

### Requirement: Per-turn random spinner with four sections
At the start of each turn the game SHALL generate a new random spinner with four sections (one per climber). Each section SHALL be at least 8% and all four sections SHALL sum to exactly 100%.

#### Scenario: Spinner changes each turn
- **WHEN** a spin resolves and the race is not over
- **THEN** a new spinner with different percentages is generated for the next turn

#### Scenario: All sections meet minimum percentage
- **WHEN** any spinner is generated
- **THEN** every section is at least 8% of the wheel

#### Scenario: Spinner sections sum to 100
- **WHEN** any spinner is generated
- **THEN** the four section percentages sum to exactly 100

### Requirement: Player places an OR bet of 1 or 2 climbers
Before each spin the player SHALL be able to tap climber tokens to select 1 or 2 climbers as their OR bet. Tapping a selected climber SHALL deselect it. A third tap when 2 are already selected SHALL be ignored. The bet persists turn to turn within a race but resets to empty at the start of each new race.

#### Scenario: Player selects one climber
- **WHEN** the player taps a climber token with no bet placed
- **THEN** that climber is added to the bet and highlighted

#### Scenario: Player selects a second climber
- **WHEN** the player taps a different climber token when one is already selected
- **THEN** both climbers are in the bet and both are highlighted

#### Scenario: Player cannot select a third climber
- **WHEN** two climbers are already in the bet and the player taps a third
- **THEN** the bet remains unchanged at two climbers

#### Scenario: Player deselects a climber
- **WHEN** the player taps a climber already in the bet
- **THEN** that climber is removed from the bet

#### Scenario: Bet resets at race start
- **WHEN** the player clicks Play Again to start a new race
- **THEN** the bet is cleared to empty

### Requirement: Live arc highlight showing combined bet probability
The spinner SVG SHALL highlight the arc(s) belonging to the bet climbers with a brighter fill and stroke ring. The combined percentage SHALL be displayed as both a number and a plain-language ratio description.

#### Scenario: Bet arc highlighted on spinner
- **WHEN** the player has selected one or more climbers
- **THEN** the spinner sections for those climbers are visually highlighted compared to unselected sections

#### Scenario: Combined percentage shown
- **WHEN** the player has selected one or more climbers
- **THEN** the combined percentage of the bet is displayed (e.g., "Your colours cover 58% of the spinner")

#### Scenario: Plain-language ratio shown
- **WHEN** the player has a non-empty bet
- **THEN** a plain-language ratio is shown (e.g., "about 1 in 2 spins")

### Requirement: Spin result display with or without a bet
After each spin the page SHALL show a result line naming the winning climber. If the player has a bet, the line SHALL indicate whether the bet won or missed. If the player has no bet, the line SHALL show a neutral message ("No bet placed — {{name}} advances!").

#### Scenario: Spin result with bet won
- **WHEN** a spin resolves and the winning climber is in the player's bet
- **THEN** the result line shows the climber name and a "Your colour!" won indicator

#### Scenario: Spin result with bet missed
- **WHEN** a spin resolves and the winning climber is not in the player's bet (and bet is non-empty)
- **THEN** the result line shows the climber name and a "Not yours" missed indicator

#### Scenario: Spin result with no bet
- **WHEN** a spin resolves and the player has no bet placed
- **THEN** the result line shows "No bet placed — {{name}} advances!" with no won/missed indicator

### Requirement: Spin button triggers animated spin
The player SHALL press a Spin button to spin the wheel. The needle SHALL animate (several full rotations then land in the winning sector). While spinning the button SHALL be disabled to prevent double-tap. The spin result is determined by a weighted random pick from the current spinner percentages.

#### Scenario: Spin button triggers animation
- **WHEN** the player presses Spin
- **THEN** the needle animates across the spinner, completes several full rotations, and lands visually within the winning sector

#### Scenario: Spin button disabled during animation
- **WHEN** the needle is still animating
- **THEN** the Spin button is disabled and cannot be pressed again

#### Scenario: Winning climber advances after spin
- **WHEN** the animation completes
- **THEN** the winning climber advances one step on the mountain

### Requirement: Warning when any climber is one step from winning
The page SHALL display a warning badge below the mountain whenever any climber is at step 5.

#### Scenario: Warning shown at step 5
- **WHEN** any climber reaches step 5
- **THEN** a warning message is shown identifying that climber (e.g., "⚠️ Blaze is one step away!")

#### Scenario: Warning cleared after race ends
- **WHEN** the race ends
- **THEN** the warning is replaced by the win/lose result message

### Requirement: Win/lose result message and Play Again
After the race ends the page SHALL show whether the player's bet won or lost, name the winning climber, and provide a Play Again button that resets all state.

#### Scenario: Bet won result
- **WHEN** the race ends and the winning climber is in the player's bet
- **THEN** a win message is shown naming the climber (e.g., "🎉 Sunny wins — that's your bet!")

#### Scenario: Bet lost result
- **WHEN** the race ends and the winning climber is not in the player's bet
- **THEN** a lose message is shown naming the climber (e.g., "Blaze wins — your bet missed.")

#### Scenario: Play Again resets everything
- **WHEN** the player clicks Play Again
- **THEN** all climber steps reset to 0, the bet clears, and a new spinner is generated

### Requirement: Race history showing last 5 races
The page SHALL display a history list of the last 5 completed races, each entry showing the race winner and whether the player's bet won or lost.

#### Scenario: History entry added after race
- **WHEN** a race completes
- **THEN** a new entry is added to the history showing the winning climber and a won/lost indicator

#### Scenario: History shows at most 5 entries
- **WHEN** more than 5 races have been completed
- **THEN** only the 5 most recent races are shown

### Requirement: ExplainerPanel and QuizPanel
The ClimberRacePage SHALL include an ExplainerPanel explaining the addition rule for mutually exclusive events and a QuizPanel with 3 questions.

#### Scenario: Explainer visible
- **WHEN** the user views ClimberRacePage
- **THEN** an ExplainerPanel is visible below the game with content about P(A OR B) = P(A) + P(B)

#### Scenario: Quiz visible
- **WHEN** the user views ClimberRacePage
- **THEN** a QuizPanel with 3 questions about the addition rule is visible

### Requirement: Climber Race fully bilingual EN/HE
All text in ClimberRacePage SHALL be provided in both English and Hebrew via the `climberRace.*` i18n namespace.

#### Scenario: Hebrew locale renders correctly
- **WHEN** the user switches to Hebrew
- **THEN** all ClimberRacePage text renders in Hebrew with correct RTL layout
