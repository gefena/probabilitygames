## ADDED Requirements

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
