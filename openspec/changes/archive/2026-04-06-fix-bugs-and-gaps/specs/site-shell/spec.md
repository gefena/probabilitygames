## MODIFIED Requirements

### Requirement: Localized mobile header title
The header SHALL display the site title using a single `<span>` element with `t('site.title')`. The previous implementation with two redundant spans (one `hidden sm:inline`, one `sm:hidden`) SHALL be replaced with a single span that renders identically at all breakpoints.

#### Scenario: Mobile header in Hebrew
- **WHEN** the user switches to Hebrew and views the site on a mobile device
- **THEN** the mobile header displays the translated site title ("מגרש המשחקים של ההסתברות")

#### Scenario: Desktop header in English
- **WHEN** the user views the site on desktop in English
- **THEN** the header displays the English site title

#### Scenario: Single span renders title
- **WHEN** the header is rendered at any viewport width
- **THEN** there is exactly one `<span>` element rendering the site title text (no duplicate spans)
