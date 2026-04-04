### Requirement: guess-phone-game keys in both locales
All user-visible strings in `GuessThePhonePage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders guess-phone page
- **WHEN** the user switches to Hebrew and visits the Guess the Phone page
- **THEN** all labels, instructions, button text, and explainer content render in Hebrew

### Requirement: hack-password-game keys in both locales
All user-visible strings in `HackThePasswordPage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders hack-password page
- **WHEN** the user switches to Hebrew and visits the Hack the Password page
- **THEN** all labels, instructions, button text, difficulty tier names, and explainer content render in Hebrew

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

### Requirement: No hardcoded user-facing strings
Every string visible to the user SHALL be rendered via the `t()` i18n function. No JSX element SHALL contain a hardcoded English string that is intended to be read by the user.

#### Scenario: MysteryMachinePage reveal table header
- **GIVEN** the user has submitted their estimate and the reveal phase is showing
- **WHEN** the comparison table is rendered
- **THEN** the "Output" column header is retrieved from the i18n key `mysteryMachine.tableOutput`
- **AND** displays in Hebrew when the Hebrew locale is active

#### Scenario: BirthdayRoomPage probability curve tooltip
- **GIVEN** the user hovers over the probability curve chart
- **WHEN** the Recharts tooltip renders
- **THEN** the series label uses `birthdayRoom.tooltipSeries` (e.g. "P(match)" in EN, "P(התאמה)" in HE)
- **AND** the x-axis label uses the existing `birthdayRoom.people` key

### Requirement: Key parity between locales
Every i18n key present in `en.json` SHALL also be present in `he.json` with a non-empty translation.

### Requirement: No hardcoded user-visible strings in JSX
Every user-visible text string in JSX page components SHALL be rendered via `t('key')`. Hardcoded English string literals that appear in the DOM as visible text are not permitted.

#### Scenario: Hebrew language active
- **WHEN** the user switches language to Hebrew
- **THEN** all visible text on every page renders in Hebrew, with no English words remaining (except math symbols: π, √, ×, %)

#### Scenario: MontyHall tooltip shows translated label
- **WHEN** the user views the batch simulator bar chart in Hebrew
- **THEN** the Recharts Tooltip shows the wins label in Hebrew, not the hardcoded English 'Wins'

#### Scenario: MontyHall sim results shows translated suffix
- **WHEN** the batch simulator has run and results are displayed in Hebrew
- **THEN** the total games paragraph reads fully in Hebrew with no English words

#### Scenario: LuckyCombo default event labels are translated
- **WHEN** a user loads the Lucky Combo page in Hebrew mode without changing any labels
- **THEN** the default outcome labels (Heads, Tails, Six, 1–5) display in Hebrew

#### Scenario: MagicSpinner tree diagram start label is translated
- **WHEN** a user views the Magic Spinner page in Hebrew
- **THEN** the "Start" label in the probability tree SVG diagram displays in Hebrew


### Requirement: greedy-pig-game keys in both locales
All user-visible strings in `GreedyPigPage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders greedy pig page
- **WHEN** the user switches to Hebrew and visits the Greedy Pig page
- **THEN** all labels, instructions, button text, bot reactions, and explainer content render in Hebrew

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
