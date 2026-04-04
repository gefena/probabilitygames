## ADDED Requirements

### Requirement: Lucky Combo outcome labels update on language change
The `outcomesA` and `outcomesB` state arrays in `LuckyComboPage` SHALL store translation keys (e.g., `'luckyCombo.defaultA1'`) rather than pre-translated strings, so that rendered labels always reflect the currently active language.

#### Scenario: Language switch updates default outcome labels
- **WHEN** the user switches the app language after the Lucky Combo page has mounted
- **THEN** all default outcome labels SHALL immediately display in the new language without requiring a page reload

#### Scenario: User-edited (custom) labels are unaffected by language switch
- **WHEN** a user renames an outcome to a custom string and then switches language
- **THEN** the custom name SHALL remain unchanged (only default, key-backed labels update)

#### Scenario: Labels render correctly on initial mount in any language
- **WHEN** the Lucky Combo page mounts while the app language is set to Hebrew
- **THEN** outcome labels SHALL display in Hebrew from the first render
