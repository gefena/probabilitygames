## ADDED Requirements

### Requirement: URL Language Parameter
The application SHALL support a `?lng=<code>` query parameter (where code is 'en' or 'he') in the URL to override the default or stored language. This parameter SHALL be detected from both the standard search query and the hash portion of the URL (e.g. `#/coin-flip?lng=he`).

#### Scenario: Language switch via search param
- **WHEN** the user navigates to `/?lng=he`
- **THEN** the application loads in Hebrew mode

#### Scenario: Language switch via hash param
- **WHEN** the user navigates to `#/dice?lng=he`
- **THEN** the application loads the Dice game in Hebrew mode
