## Context

`GamePageLayout.jsx` renders a back button above the game title on all 26 pages. After the previous tap-target fix it has `py-3 px-2 -mx-2 rounded-lg hover:bg-violet-50`. The button still looks like plain text — `rounded-lg` and a faint violet hover don't match the site's card aesthetic (rounded-3xl panels, white backgrounds, soft shadows).

The site's design language:
- Cards and panels: `bg-white rounded-3xl shadow-[...]`
- Secondary buttons/chips: `bg-white border border-violet-200 rounded-xl`
- No pill-shaped (rounded-full) chips exist yet — this would be the first, establishing a pattern for navigation affordances

## Goals / Non-Goals

**Goals:**
- Make the back button visually consistent with the site's card/chip aesthetic
- Make it feel clearly interactive (not just text)
- Improve the label to be more student-friendly

**Non-Goals:**
- Changing button placement or layout
- Making the nav logo a link (separate concern)
- Any other navigation changes

## Decisions

### 1. `rounded-full` pill shape

`rounded-full` is the natural choice for a navigation chip — it reads as "tag" or "badge" rather than a full button. Consistent with how pill chips appear in modern education UIs (Duolingo, Khan Academy).

Alternative: keep `rounded-lg` — rejected; too close to a rectangular button, doesn't distinguish itself visually.

### 2. `bg-white shadow-sm border border-slate-200` surface

Matches the white card panels throughout the site. On `slate-100` background, a white pill with subtle shadow lifts off cleanly.

Alternative: `bg-violet-100 text-violet-700` — a filled violet chip. Rejected: competes too much with the violet page title directly below it.

### 3. `hover:shadow-md` instead of `hover:bg-violet-50`

A shadow lift is a more refined hover for a white chip than a background fill. Pairs naturally with `shadow-sm` at rest.

### 4. Label: "← Games" / "← משחקים"

"Home" is abstract for a student. "Games" directly names what they're navigating back to. Short, clear, fits in the pill without wrapping.

### 5. Keep `py-3` for tap target

The previous change established `py-3` for 44px touch height. Keep it — the pill shape with padding looks natural at this size.

## Risks / Trade-offs

- **First `rounded-full` element outside the nav language switcher**: Sets a precedent. Low risk — it's a good pattern to establish.
- **Shadow on slate-100**: `shadow-sm` is subtle enough not to look heavy; tested mental model works.
- No layout changes → zero regression risk.
