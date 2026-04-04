## ADDED Requirements

### Requirement: i18n JSON Structure Integrity
All automated or manual modifications to `en.json` and `he.json` SHALL be performed using JSON-aware parsing tools (e.g. `JSON.parse()` and `JSON.stringify()`) to prevent accidental deletion of nested objects or structures. String-based regular expression replacements SHALL NOT be used for structural updates.

#### Scenario: Structural modification of i18n files
- **WHEN** a developer adds a new common key to the localization files
- **THEN** the existing game-specific nested objects (e.g., `dice`, `coin`, `candy`) remain completely intact and functional
