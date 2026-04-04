## ADDED Requirements

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
