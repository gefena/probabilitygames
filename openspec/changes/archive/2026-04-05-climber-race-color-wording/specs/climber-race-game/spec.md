## MODIFIED Requirements

### Requirement: Player places an OR bet of 1 or 2 colors
Before each spin the player SHALL be able to tap color tokens to select 1 or 2 colors as their OR bet. Tapping a selected color SHALL deselect it. A third tap when 2 are already selected SHALL be ignored. The bet persists turn to turn within a race but resets to empty at the start of each new race.

#### Scenario: Player selects one color
- **WHEN** the player taps a color token with no bet placed
- **THEN** that color is added to the bet and highlighted

#### Scenario: Player selects a second color
- **WHEN** the player taps a different color token when one is already selected
- **THEN** both colors are in the bet and both are highlighted

#### Scenario: Player cannot select a third color
- **WHEN** two colors are already in the bet and the player taps a third
- **THEN** the bet remains unchanged at two colors

#### Scenario: Player deselects a color
- **WHEN** the player taps a color already in the bet
- **THEN** that color is removed from the bet

#### Scenario: Bet resets at race start
- **WHEN** the player clicks Play Again to start a new race
- **THEN** the bet is cleared to empty

### Requirement: Live arc highlight showing combined bet probability
The spinner SVG SHALL highlight the arc(s) belonging to the bet colors with a brighter fill and stroke ring. The combined percentage SHALL be displayed as both a number and a plain-language ratio description.

#### Scenario: Bet arc highlighted on spinner
- **WHEN** the player has selected one or more colors
- **THEN** the spinner sections for those colors are visually highlighted compared to unselected sections

#### Scenario: Combined percentage shown
- **WHEN** the player has selected one or more colors
- **THEN** the combined percentage of the bet is displayed (e.g., "Your colours cover 58% of the spinner")

#### Scenario: Plain-language ratio shown
- **WHEN** the player has a non-empty bet
- **THEN** a plain-language ratio is shown (e.g., "about 1 in 2 spins")

### Requirement: Climber Race fully bilingual EN/HE
All text in ClimberRacePage SHALL be provided in both English and Hebrew via the `climberRace.*` i18n namespace. UI prompts and educational content SHALL refer to betting on **colors**, not "climbers", to avoid confusing the betting mechanic with the climbing mechanic.

#### Scenario: Hebrew locale renders correctly
- **WHEN** the user switches to Hebrew
- **THEN** all ClimberRacePage text renders in Hebrew with correct RTL layout

#### Scenario: Color framing in all bet-related text
- **WHEN** the user reads any prompt about placing or reviewing a bet
- **THEN** the text refers to "color(s)" / "צבע/ים", not "climber(s)" / "מטפס/ים"
