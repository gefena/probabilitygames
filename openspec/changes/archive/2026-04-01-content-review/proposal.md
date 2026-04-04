## Why

The recent wave of new pages added a lot of content quickly. A review pass is needed to fix hardcoded English strings that bypass the i18n system, simplify a few explanations that are too advanced for 10-year-olds, and polish the Hebrew translations (arrow direction in RTL context, one formula inside a tooltip).

## What Changes

- Fix hardcoded `"Output"` column header in MysteryMachinePage reveal table (bypasses Hebrew translation entirely)
- Fix hardcoded chart tooltip strings in BirthdayRoomPage (`'P(match)'`, `'people'`)
- Simplify the Prize Machine expected-value explainer example — the current version walks through a multi-step decimal calculation that is beyond most 10-year-olds
- Soften the "Gambler's Fallacy" label in the Coin Flip quiz — introduce the concept without using the academic term
- Verify and fix RTL arrow directions in Hebrew strings for the Spinner two-rounds summary and Card Draw conditional probability explainer

## Capabilities

### New Capabilities

- `i18n-completeness`: All visible UI strings go through the i18n system with no hardcoded English fallbacks

### Modified Capabilities

- `coin-flip-lab`: Quiz explanation for q2 softened to avoid adult gambling jargon
- `magic-spinner`: Hebrew two-rounds summary arrow direction corrected for RTL

## Impact

- `src/pages/MysteryMachinePage.jsx` — add i18n key for table column header
- `src/pages/BirthdayRoomPage.jsx` — replace tooltip formatter strings with i18n keys
- `src/i18n/en.json` — add 3 missing keys; update prizeMachine explainer example; soften coin quiz q2 explanation
- `src/i18n/he.json` — same key additions with Hebrew text; fix arrow directions
