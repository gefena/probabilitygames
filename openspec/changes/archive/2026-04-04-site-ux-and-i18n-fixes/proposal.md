## Why

Address UX issues identified in the review: the document title remains static regardless of the game or language, the mobile header is hardcoded in English, and Hebrew translations use "pre-reversed" punctuation which is unnecessary and inconsistent with proper RTL handling.

## What Changes

- **Dynamic Document Title**: Update `<title>` to reflect the current game and language (e.g., "Coin Flip - Probability Playground").
- **Localized Mobile Header**: Use translated site title in the mobile header instead of hardcoded English.
- **Hebrew Punctuation Fix**: Remove leading punctuation used for pre-reversal in `he.json` and move it to the correct logical end of strings.
- **URL Language Support**: Support `?lng=en` or `?lng=he` query parameters to allow direct linking to a specific language version.
- **i18n Key Rationalization**: Move game names to a consistent top-level `games` or `common.games` structure to avoid duplication and simplify title updates.

## Capabilities

### New Capabilities
- `url-language-param`: Support for setting/overriding language via `?lng=` URL parameter.
- `dynamic-document-title`: Automatic updates to the browser tab title based on the active page and language.

### Modified Capabilities
- `site-shell`: Update mobile header to be localized.
- `i18n-completeness`: Standardize Hebrew punctuation and rationalize game naming keys.

## Impact

- `src/App.jsx`: Logic for `document.title` and `?lng=` parameter.
- `src/components/AppLayout.jsx`: Mobile header localization.
- `src/i18n/he.json`: Comprehensive update to punctuation.
- `src/i18n/en.json` & `he.json`: Reorganization of game name keys.
- All game pages: Update to use new game name keys.
