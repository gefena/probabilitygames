## MODIFIED Requirements

### Requirement: Language switcher
The site SHALL provide a visible toggle to switch between English and Hebrew. Switching language SHALL update all UI text and flip the layout direction (LTR ↔ RTL) without a page reload. The switcher buttons SHALL display emoji country flags (🇬🇧 for English, 🇮🇱 for Hebrew) instead of text labels, making the control immediately recognisable to young users.

#### Scenario: Switch to Hebrew
- **WHEN** the user selects Hebrew from the language switcher
- **THEN** all visible text changes to Hebrew, the `dir` attribute on `<html>` becomes `rtl`, and all layout elements mirror correctly

#### Scenario: Switch back to English
- **WHEN** the user selects English from the language switcher
- **THEN** all visible text reverts to English and the `dir` attribute on `<html>` becomes `ltr`

#### Scenario: Language preference persisted
- **WHEN** the user selects a language and then reloads the page
- **THEN** the previously selected language is restored

#### Scenario: Flag buttons identify languages
- **WHEN** the language switcher is visible
- **THEN** the English option shows 🇬🇧 and the Hebrew option shows 🇮🇱
