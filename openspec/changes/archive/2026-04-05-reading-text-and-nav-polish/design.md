## Context

The site uses Tailwind CSS with Heebo font. No custom `fontSize` extension is defined in `tailwind.config.js`, so all sizes are Tailwind defaults (browser base 16px). Reading content in `ExplainerPanel` and `QuizPanel` is uniformly `text-sm` (14px). The `GamePageLayout` back button has no padding — just bare text — making it a poor tap target on mobile.

Both panels are shared components used across all 26 game pages. Changes here propagate site-wide without any per-page edits.

## Goals / Non-Goals

**Goals:**
- Bring reading-text in explainer and quiz panels to browser-default size (16px)
- Give the back-home button a minimum comfortable tap target on mobile
- Keep changes surgical — shared components only, no per-page work

**Non-Goals:**
- Changing button/control text sizes (mode toggles, CTA buttons — these are fine)
- Changing `GameCard` description size (compact card grid, leave as-is)
- Changing chart/axis label sizes (recharts inline styles, out of scope)
- Changing `text-xs` further-reading footnotes (intentionally de-emphasized)
- Any layout restructuring

## Decisions

### 1. Bump reading text `text-sm` → `text-base` (not `text-lg`)

Going to `text-base` (16px) matches the browser default — a well-established readable baseline. Going to `text-lg` (18px) would be over-correcting for body text inside panels with `p-5` padding.

Alternative considered: `text-[15px]` one-off size — rejected; avoids Tailwind conventions and non-standard.

### 2. Bump panel H3 titles `text-base` → `text-lg`

Currently the ExplainerPanel and QuizPanel headings ("💡 Concept" / "🧠 Quiz") are `text-base` — same size as body text after the bump. Lifting them to `text-lg` (18px) restores the visual hierarchy: heading ≥ body.

### 3. Back button: add `py-3 px-2 -mx-2 rounded-lg`

`py-3` = 12px top + 12px bottom padding. Combined with ~20px line-height = 44px touch height, meeting the iOS/Android minimum tap target guideline. The negative horizontal margin (`-mx-2`) offsets the horizontal padding so the visible text position is unchanged. `rounded-lg` gives a subtle hover/focus shape without a visible border.

Alternative: `py-1.5` — only ~32px total height, does not meet the 44px spec.

Alternative: make it a `Link` with an icon arrow — rejected as over-engineering; the text already says "← Home".

### 4. No i18n changes

Font size is purely visual. No text content changes. No Hebrew-specific adjustments needed — Heebo renders well at both sizes.

## Risks / Trade-offs

- **Panel height increase**: Bumping body text from 14→16px makes ExplainerPanel and QuizPanel slightly taller (~10–15%). On mobile these are full-width stacked; the user scrolls slightly more. Acceptable trade-off for readability.
  → Mitigation: panels have no fixed heights; content reflows cleanly.

- **Regression risk is near-zero**: Both components have no fixed dimensions, no overflow:hidden on text areas, and no layout that would break at 16px.
