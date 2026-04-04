## MODIFIED Requirements

### Requirement: Localized mobile header title
The mobile header title (visible on screens < 640px) SHALL be retrieved via the i18n key `site.title` and SHALL NOT be hardcoded in English.

#### Scenario: Mobile header in Hebrew
- **WHEN** the user switches to Hebrew and views the site on a mobile device
- **THEN** the mobile header displays the translated site title ("מגרש המשחקים של ההסתברות")
