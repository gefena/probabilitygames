## ADDED Requirements

### Requirement: Galton Board SVG bin-count labels removed
The per-bin numeric labels inside the Galton Board SVG (currently rendered as `<text>` elements capped at `'99+'`) SHALL be removed. The Recharts histogram below the SVG already shows exact counts on tooltip hover, making the SVG labels redundant and misleading at high drop counts.

#### Scenario: Dropping 1000 balls does not show truncated counts in the SVG
- **WHEN** the user drops 1000 balls
- **THEN** no `'99+'` or any other numeric label SHALL appear inside the SVG board area
- **AND** the histogram below SHALL still show correct counts and tooltip values

#### Scenario: Dropping 10 balls shows no SVG count labels
- **WHEN** the user drops 10 balls
- **THEN** no per-bin count labels SHALL appear in the SVG (labels are removed entirely, not just hidden at high counts)

### Requirement: Pizza Builder count badges appear from the first order
The count badge on each pizza grid cell SHALL be shown after the first order, not only after 20 orders. Before 20 orders, a count of 0 SHALL still show a subdued badge (consistent with the existing gray badge style for zero counts).

#### Scenario: First order shows a count badge on the ordered cell
- **WHEN** the user clicks Order for the first time
- **THEN** the cell that was ordered SHALL show a badge with count `1`
- **AND** all other cells SHALL show a badge with count `0` in subdued styling

#### Scenario: Badges remain visible and increment correctly after 20 orders
- **WHEN** the user has placed 20 or more orders
- **THEN** badge counts SHALL continue to update correctly as before (no regression)

#### Scenario: No orders placed — no badges shown
- **WHEN** the user has placed zero orders
- **THEN** no count badges SHALL be visible on any cell (unchanged from current behavior)
