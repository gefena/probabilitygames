## Why

A recent string replacement error during the implementation of the `site-ux-and-i18n-fixes` change accidentally deleted large portions of `en.json` and `he.json` (including the `home`, `coin`, `dice`, `candy`, etc. sections). This caused games like "Dice Detective" to lose their descriptions and content, making them invisible or broken on the Home page and their individual pages.

## What Changes

- **Restore i18n Data**: Revert the `en.json` and `he.json` files to their state prior to the `site-ux-and-i18n-fixes` commit.
- **Re-apply i18n Fixes Correctly**: Safely add the `common.games` mapping, the `site.title`, and re-run the Hebrew punctuation correction algorithm without deleting existing JSON structures.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `i18n-completeness`: Add constraints around editing i18n JSON files securely.

## Impact

- `src/i18n/en.json`
- `src/i18n/he.json`
All game pages and the home page will become fully functional again.
