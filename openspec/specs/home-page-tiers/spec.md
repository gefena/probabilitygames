## MODIFIED Requirements

### Requirement: Home page organised into interaction tiers
The home page SHALL organise all games into four named tiers ordered by interaction intensity: "Beat the Bot", "Crack the Code", "Test Your Wits", and "From Chaos to Order". Each tier SHALL display a heading and a one-sentence tagline before its game cards.

#### Scenario: Tiers appear in interaction-intensity order
- **WHEN** a user loads the home page
- **THEN** the four tier sections are visible in order from top to bottom: Beat the Bot, Crack the Code, Test Your Wits, From Chaos to Order

#### Scenario: Each tier has a heading and tagline
- **WHEN** a user views any tier section
- **THEN** a tier heading and a short tagline sentence are visible above the game cards

### Requirement: Tier 1 — Beat the Bot (five bot-opponent games)
The first tier SHALL contain Bridge Quest, Climber Race, Greedy Pig, Remove One, and Probability Bingo — games where the user plays against a bot and a winner is declared.

#### Scenario: Beat the Bot contains the five bot-opponent games
- **WHEN** a user views the Beat the Bot tier
- **THEN** cards for Bridge Quest, Climber Race, Greedy Pig, Remove One, and Probability Bingo are visible

### Requirement: Tier 2 — Crack the Code (deduction games)
The second tier SHALL contain Guess the Phone, Hack the Password, and Pattern Lock Hacker. The tier SHALL use a dark background panel to signal a distinct category.

#### Scenario: Crack the Code tier is visually distinct
- **WHEN** a user views the Crack the Code tier
- **THEN** it is rendered on a dark background panel and contains cards for Guess the Phone, Hack the Password, and Pattern Lock Hacker

### Requirement: Tier 3 — Test Your Wits (solo challenge and decision games)
The third tier SHALL contain Higher or Lower, Dice Detective, Monty Hall, Mystery Machine, House Always Wins, and Prize Machine — games where the user makes decisions and receives scored or win/loss feedback without a bot opponent.

#### Scenario: Test Your Wits contains the six solo challenge games
- **WHEN** a user views the Test Your Wits tier
- **THEN** cards for Higher or Lower, Dice Detective, Monty Hall, Mystery Machine, House Always Wins, and Prize Machine are visible

### Requirement: Tier 4 — From Chaos to Order (simulation and visualisation)
The fourth tier SHALL contain Coin Flip, Lucky Dice, Candy Jar, Magic Spinner, Card Draw, Roll & Race, Pizza Builder, Lucky Combo, Galton Board, Random Walk, Monte Carlo π, and Birthday Room. The tier SHALL use a dark background panel.

#### Scenario: From Chaos to Order contains all twelve simulation games
- **WHEN** a user views the From Chaos to Order tier
- **THEN** cards for all twelve simulation and visualisation games are visible

### Requirement: All games use GameCard component
Every game entry in every tier SHALL be rendered using the shared `GameCard` component with to, emoji, title, desc, and color props. No bespoke button elements for game navigation.

#### Scenario: All cards are uniform
- **WHEN** a user views any tier
- **THEN** all game entries share the same card shape, hover animation, and tap behaviour as the existing GameCard component

### Requirement: Tier headings and taglines are i18n-keyed
All tier heading and tagline strings SHALL be retrieved via translation keys and SHALL have translations in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders tier headings
- **WHEN** the user switches to Hebrew and views the home page
- **THEN** all four tier headings and taglines render in Hebrew
