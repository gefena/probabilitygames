## Context

Each game page currently shows interactive controls and a live stats chart, but no explanation of *why* the probability behaves the way it does. Children benefit from having the concept explained right next to the experiment, using concrete numbers they can verify themselves by playing the game.

## Goals / Non-Goals

**Goals:**
- A shared `ExplainerPanel` component that renders a titled concept block, a worked example, and an optional visual (emoji row, probability bar, or inline fraction)
- Each game gets one `ExplainerPanel` placed below the interactive area, above any existing chart
- All text is i18n-keyed; worked examples use live values from game state where possible (e.g., current jar composition, current flip count)
- Fully bilingual (English / Hebrew), RTL-safe

**Non-Goals:**
- Animated tutorials or step-by-step walkthroughs
- A separate "learn" page or modal
- Any new library dependencies

## Decisions

### 1. Shared `ExplainerPanel` component
**Choice**: One reusable component (`src/components/ExplainerPanel.jsx`) that accepts `title`, `body`, `example`, and optional `visual` props.  
**Why**: Keeps styling consistent across all five games; easy to update the look globally. Each game composes the props differently using live state.

### 2. Live values in examples where meaningful
**Choice**: Inject live game state into the example text where it makes the example immediately verifiable (candy jar composition → fraction; coin flip count → distance from 50%).  
**Why**: Makes the explainer interactive rather than static — a child can change the jar composition and watch the fraction update in real time.  
**Where static is fine**: Card draw worked examples use fixed reference numbers because the before/after comparison is already live from actual draws. The coin flip worked example is live — it shows the actual current flip count and heads % so the child can watch the number creep toward 50% in real time.

### 3. Visual aid: emoji probability bar
**Choice**: A simple row of coloured emoji/div blocks proportional to probability, rendered inline in the panel.  
**Why**: No library needed; intuitive for kids; works in both LTR and RTL. Used for candy jar and spinner. Other games use plain text or fraction displays.

### 4. Placement: below controls, above chart
**Choice**: `ExplainerPanel` sits between the interactive section and the results chart on each page.  
**Why**: The child interacts first (discovers the behaviour), then reads the explanation, then sees the stats reinforcing it — matches a natural discovery flow.

## Risks / Trade-offs

- **Text length in Hebrew**: Hebrew translated strings can be slightly longer in some phrases; the panel uses `leading-relaxed` and no fixed heights, so this is safe.
- **Live values can lag by one render**: Since examples derive from state, they always reflect the *current* state (before the next flip/draw), not the last result. This is acceptable — the example explains the *setup*, not the individual outcome.
