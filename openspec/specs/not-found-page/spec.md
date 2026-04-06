### Requirement: 404 catch-all route
The app SHALL include a `<Route path="*">` as the last route in App.jsx that renders a friendly "page not found" screen when no other route matches.

#### Scenario: User navigates to non-existent path
- **WHEN** the user navigates to a URL that does not match any defined route (e.g. `/lucky-dice`, `/foo`)
- **THEN** a 404 page is displayed with a friendly emoji, a translated "page not found" message, and a button to navigate back to the home page

#### Scenario: 404 page uses site layout
- **WHEN** the 404 page is displayed
- **THEN** it renders inside the AppLayout (header and language switcher are visible)

#### Scenario: 404 page is translated
- **WHEN** the 404 page is displayed and the language is set to Hebrew
- **THEN** all text on the 404 page is displayed in Hebrew with correct RTL layout

### Requirement: 404 i18n keys
The i18n files SHALL include keys under `notFound.*` for the 404 page title and message in both English and Hebrew.

#### Scenario: English 404 text
- **WHEN** the language is English
- **THEN** the 404 page displays "Page Not Found" as the title and a friendly message suggesting the user return home

#### Scenario: Hebrew 404 text
- **WHEN** the language is Hebrew
- **THEN** the 404 page displays the Hebrew equivalent of the title and message
