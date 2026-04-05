## Why

Reading content across all game pages (explainer panels, quiz questions, quiz options) is set to `text-sm` (14px) — smaller than the browser default — making it unnecessarily hard to read, especially on mobile and for younger students. The back-home button has no padding, making it a poor tap target on touch devices.

## What Changes

- Bump all **reading text** in `ExplainerPanel` from `text-sm` → `text-base` (body, example box, callout box)
- Bump `ExplainerPanel` section title from `text-base` → `text-lg` for clearer visual hierarchy
- Bump `QuizPanel` question, options, and explanation text from `text-sm` → `text-base`
- Bump `QuizPanel` section title from `text-base` → `text-lg`
- Add vertical padding to the **back-home button** in `GamePageLayout` so it has a proper tap target on mobile

## Capabilities

### New Capabilities
<!-- none — these are polish changes to shared UI components -->

### Modified Capabilities
- `site-shell`: Back-home button tap target improvement (behavior unchanged, hit area enlarged)

## Impact

- `src/components/ExplainerPanel.jsx` — font size class changes (3 text roles)
- `src/components/QuizPanel.jsx` — font size class changes (3 text roles)
- `src/components/GamePageLayout.jsx` — back button padding added
- All 26 game pages are affected via shared components; no per-page edits needed
- No i18n changes, no route changes, no logic changes
