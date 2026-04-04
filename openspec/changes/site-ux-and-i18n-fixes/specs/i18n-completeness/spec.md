## MODIFIED Requirements

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
