## Why

The back-home button on every game page looks out of place — plain text that doesn't match the site's rounded, card-based visual language. Students need a clear, friendly way to return to the games list; the current button is too subtle and too generic.

## What Changes

- Restyle the back button in `GamePageLayout` as a **pill chip**: `rounded-full`, white background, soft shadow, slate border — consistent with the site's card aesthetic
- Change hover effect from `hover:bg-violet-50` to `hover:shadow-md` — a subtle lift feels more polished
- Update the label from "← Home" / "← בית" to "← Games" / "← משחקים" — more meaningful for students who want to go back to the games list

## Capabilities

### New Capabilities

### Modified Capabilities
- `site-shell`: Back button visual style update (label wording + CSS classes only; behavior and placement unchanged)

## Impact

- `src/components/GamePageLayout.jsx` — class changes on the button element
- `src/i18n/en.json` and `src/i18n/he.json` — update `common.backHome` label
- All 26 game pages affected via the shared component; no per-page edits needed
