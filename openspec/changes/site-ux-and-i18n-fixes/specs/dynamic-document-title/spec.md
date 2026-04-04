## ADDED Requirements

### Requirement: Dynamic Page Title
The browser tab title (`document.title`) SHALL update dynamically to reflect the current game and the site title in the active language. The format SHALL be "[Game Name] - [Site Title]" on game pages and "[Site Title]" on the home page.

#### Scenario: Title on home page (English)
- **WHEN** the user visits the home page in English
- **THEN** the document title is "Probability Playground"

#### Scenario: Title on game page (Hebrew)
- **WHEN** the user visits the Coin Flip page in Hebrew
- **THEN** the document title is "מעבדת הטלת מטבע - מגרש המשחקים של ההסתברות"
