## ADDED Requirements

### Requirement: Correct Hebrew game name for coin-flip
The Hebrew translation for the coin-flip game SHALL be "מעבדת הטלת מטבעות" (coin toss lab), not "מעבדת הטבעת מטבע".

#### Scenario: Hebrew mode active, home page
- **WHEN** the user views the home page in Hebrew
- **THEN** the coin-flip game card title reads "מעבדת הטלת מטבעות"

### Requirement: Correct Hebrew game name for roll-and-race
The Hebrew translation for roll-and-race SHALL use the imperative verb form "גלגלו והתחרו", not the noun form "גלגלו ותחרות".

#### Scenario: Hebrew mode active, home page
- **WHEN** the user views the home page in Hebrew
- **THEN** the roll-and-race game card title reads "גלגלו והתחרו"

### Requirement: Unambiguous Hebrew name for monte-carlo-pi
The Hebrew translation for the monte-carlo-pi game SHALL include "(פאי)" after the π symbol to prevent confusion with the letter n in Hebrew fonts.

#### Scenario: Hebrew mode active, monte-carlo-pi page
- **WHEN** the user views the Monte Carlo Pi game in Hebrew
- **THEN** the page title and card title contain "(פאי)" making the π symbol unambiguous

### Requirement: Plain color names in Climber Race quiz and explainer text
All quiz question prose and explainer body text for the Climber Race game SHALL refer to colors by their plain color names (Yellow, Red, Blue, Green / צהוב, אדום, כחול, ירוק), not by old character-style names (Sunny, Blaze, Storm, Ivy / שמשון, בלייז, סערה, איבי, שמשי).

#### Scenario: English quiz question references a color
- **WHEN** a Climber Race quiz question mentions a spinner color
- **THEN** it uses "Yellow", "Red", "Blue", or "Green" — never "Sunny", "Blaze", "Storm", or "Ivy"

#### Scenario: Hebrew quiz question references a color
- **WHEN** a Climber Race quiz question in Hebrew mentions a spinner color
- **THEN** it uses "צהוב", "אדום", "כחול", or "ירוק" — never "שמשון", "בלייז", "סערה", "איבי", or "שמשי"
