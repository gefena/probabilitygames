
### Requirement: Home page organised into complexity tiers
The home page SHALL organise all games into four named tiers ordered by increasing complexity: "Start Here", "Go Deeper", "Crack the Code", and "Patterns in Chaos". Each tier SHALL display a heading and a one-sentence tagline before its game cards.

#### Scenario: Tiers appear in complexity order
- **WHEN** a user loads the home page
- **THEN** the four tier sections are visible in order from top to bottom: Start Here, Go Deeper, Crack the Code, Patterns in Chaos

#### Scenario: Each tier has a heading and tagline
- **WHEN** a user views any tier section
- **THEN** a tier heading and a short tagline sentence are visible above the game cards

### Requirement: Tier 1 — Start Here (six simple interactive games)
The first tier SHALL contain Coin Flip, Lucky Dice, Candy Jar, Magic Spinner, Higher or Lower, and Card Draw — ordered by increasing interaction complexity.

#### Scenario: Start Here contains the six simple games
- **WHEN** a user views the Start Here tier
- **THEN** cards for Coin Flip, Lucky Dice, Candy Jar, Magic Spinner, Higher or Lower, and Card Draw are visible in that order

### Requirement: Tier 2 — Go Deeper (strategy and decision games)
The second tier SHALL contain Roll & Race, Dice Detective, Pizza Builder, Remove One, Probability Bingo, Climber Race, Bridge Quest, Greedy Pig, Lucky Combo, House Always Wins, and Prize Machine — ordered from simple races and counting to complex strategy and expected value.

#### Scenario: Go Deeper contains all strategy and compound-event games
- **WHEN** a user views the Go Deeper tier
- **THEN** cards for Roll & Race, Dice Detective, Pizza Builder, Remove One, Probability Bingo, Climber Race, Bridge Quest, Greedy Pig, Lucky Combo, House Always Wins, and Prize Machine are visible in that order

### Requirement: Tier 3 — Crack the Code (combinatorics guessing games)
The third tier SHALL contain Guess the Phone and Hack the Password. The tier SHALL use a dark background panel to signal a distinct category.

#### Scenario: Crack the Code tier is visually distinct
- **WHEN** a user views the Crack the Code tier
- **THEN** it is rendered on a dark background panel and contains cards for Guess the Phone and Hack the Password

### Requirement: Tier 4 — Patterns in Chaos (simulation and visualisation)
The fourth tier SHALL contain Galton Board, Random Walk, Monte Carlo π, Birthday Room, Monty Hall, and Mystery Machine. The tier SHALL use a dark background panel.

#### Scenario: Patterns in Chaos contains all six simulation games
- **WHEN** a user views the Patterns in Chaos tier
- **THEN** cards for Galton Board, Random Walk, Monte Carlo π, Birthday Room, Monty Hall, and Mystery Machine are visible in that order

### Requirement: All games use GameCard component
Every game entry in every tier SHALL be rendered using the shared `GameCard` component with to, emoji, title, desc, and color props. No bespoke button elements for game navigation.

#### Scenario: All cards are uniform
- **WHEN** a user views any tier
- **THEN** all game entries share the same card shape, hover animation, and tap behaviour as the existing GameCard component

### Requirement: Tier headings and taglines are i18n-keyed
All tier heading and tagline strings SHALL be retrieved via `t('home.tiers.<key>.title')` and `t('home.tiers.<key>.tagline')` and SHALL have translations in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders tier headings
- **WHEN** the user switches to Hebrew and views the home page
- **THEN** all four tier headings and taglines render in Hebrew
