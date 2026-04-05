### Requirement: How-to-play instruction on every game page
Every game page SHALL display a brief (1-2 sentence) instruction visible above the game controls, telling the user what to do first and what to watch for.

#### Scenario: New user visits any game page
- **WHEN** a user loads any of the 14 game pages
- **THEN** a how-to-play instruction is visible before the game controls, in the active language

### Requirement: No academic jargon in explainer titles
Explainer panel titles SHALL use plain language, questions, or observations rather than formal mathematical terminology.

#### Scenario: Explainer titles are curiosity-driven
- **WHEN** a user views any explainer panel
- **THEN** the title does not contain terms like "Law of Large Numbers", "Statistical Inference", "Central Limit Theorem", "√n Law", or "Expected Value" as the primary title text

### Requirement: No hardcoded user-visible strings in JSX
Every user-visible text string in JSX page components SHALL be rendered via `t('key')`. Hardcoded English string literals that appear in the DOM as visible text are not permitted.

#### Scenario: Hebrew language active
- **WHEN** the user switches language to Hebrew
- **THEN** all visible text on every page renders in Hebrew, with no English words remaining (except math symbols: π, √, ×, %)

### Requirement: Key parity between locales
Every i18n key present in `en.json` SHALL also be present in `he.json` with a non-empty translation.

### Requirement: URL Language Parameter
The application SHALL support a `?lng=<code>` query parameter (where code is 'en' or 'he') in the URL to override the default or stored language. This parameter SHALL be detected from both the standard search query and the hash portion of the URL (e.g. `#/coin-flip?lng=he`).

#### Scenario: Language switch via search param
- **WHEN** the user navigates to `/?lng=he`
- **THEN** the application loads in Hebrew mode

#### Scenario: Language switch via hash param
- **WHEN** the user navigates to `#/dice?lng=he`
- **THEN** the application loads the Dice game in Hebrew mode

### Requirement: Standardised Hebrew punctuation
Hebrew strings in `he.json` SHALL use standard logical punctuation (at the end of the string). "Pre-reversed" punctuation (e.g. `"!הטל"`) SHALL NOT be used, as the application correctly implements `dir="rtl"`.

#### Scenario: Punctuation renders correctly in RTL
- **WHEN** a Hebrew string with a trailing exclamation mark (e.g. `"הטל!"`) is rendered in a `dir="rtl"` container
- **THEN** the exclamation mark is displayed on the left (the end of the Hebrew line)

### Requirement: Rationalised game naming keys
Game titles SHALL be moved to a shared `common.games.<id>.title` structure. Duplicated game title keys across different components and home page tiers SHALL be consolidated to use these shared keys.

#### Scenario: Consistent game titles
- **WHEN** a game title is updated in the shared keys
- **THEN** the new title is automatically reflected on the home page card, the game page header, and the browser document title

### Requirement: i18n JSON Structure Integrity
All automated or manual modifications to `en.json` and `he.json` SHALL be performed using JSON-aware parsing tools (e.g. `JSON.parse()` and `JSON.stringify()`) to prevent accidental deletion of nested objects or structures. String-based regular expression replacements SHALL NOT be used for structural updates.

#### Scenario: Structural modification of i18n files
- **WHEN** a developer adds a new common key to the localization files
- **THEN** the existing game-specific nested objects (e.g., `dice`, `coin`, `candy`) remain completely intact and functional

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
