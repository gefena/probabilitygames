## ADDED Requirements

### Requirement: Growing menu grid
The game SHALL present a grid of all possible pizza combinations that updates live as the player adds crusts and toppings. Adding one crust SHALL add a whole new row; adding one topping SHALL add a whole new column.

#### Scenario: Grid appears on load
- **WHEN** the game loads
- **THEN** a 2×2 grid (2 default crusts × 2 default toppings) is visible with 4 pizza cells

#### Scenario: Tapping "+ Add Topping" opens a picker
- **WHEN** the player taps "+ Add Topping"
- **THEN** a picker appears showing only toppings not already on the menu

#### Scenario: Picking a topping adds a column
- **WHEN** the player selects a topping from the picker
- **THEN** the picker closes, a new column appears in the grid, and the total count updates (e.g., "6 possible pizzas")

#### Scenario: Tapping "+ Add Crust" opens a picker
- **WHEN** the player taps "+ Add Crust"
- **THEN** a picker appears showing only crusts not already on the menu

#### Scenario: Picking a crust adds a row
- **WHEN** the player selects a crust from the picker
- **THEN** the picker closes, a new row appears in the grid, and the total count updates

#### Scenario: Menu limits are enforced
- **WHEN** the player has added all available crusts (4) or all available toppings (5)
- **THEN** the corresponding "+ Add" button is hidden

### Requirement: OR statement builder via cell selection
The player SHALL be able to tap individual grid cells, row headers, or column headers to mark winning pizzas. The count of winning cells SHALL update live.

#### Scenario: Tapping a cell marks it as a winner
- **WHEN** the player taps a grid cell
- **THEN** that cell is highlighted and the winner count increments

#### Scenario: Tapping again deselects the cell
- **WHEN** the player taps an already-highlighted cell
- **THEN** the highlight is removed and the winner count decrements

#### Scenario: Tapping a row header selects the whole row
- **WHEN** the player taps a crust row header
- **THEN** all cells in that row are toggled (selected if any were unselected, deselected if all were selected)

#### Scenario: Tapping a column header selects the whole column
- **WHEN** the player taps a topping column header
- **THEN** all cells in that column are toggled (selected if any were unselected, deselected if all were already selected)

#### Scenario: Winner count is always visible
- **WHEN** at least one cell is selected
- **THEN** the label shows "{{n}} of your {{total}} pizzas are winners!"

#### Scenario: Winners pruned when menu shrinks
- **WHEN** the player removes a crust or topping that had selected cells
- **THEN** those cells are removed from the winners set and the count updates

#### Scenario: Orders reset when menu shrinks
- **WHEN** the player removes a crust or topping
- **THEN** all order history is cleared (orders reset to zero) to prevent stale entries from skewing the heatmap

### Requirement: Random order mechanic
The player SHALL be able to order a random pizza by pressing a button. The result SHALL be determined by two independent random picks (one for crust, one for topping). The matching cell in the grid SHALL be highlighted and a win/lose message shown.

#### Scenario: Order produces a result
- **WHEN** the player presses "Order a Random Pizza!"
- **THEN** after a brief animation, one cell in the grid is highlighted as the ordered pizza

#### Scenario: Win message on matching cell
- **WHEN** the ordered pizza's cell is in the winners set
- **THEN** a win message is shown ("🎉 Thin + Mushroom — that's yours!")

#### Scenario: Lose message on non-matching cell
- **WHEN** the ordered pizza's cell is not in the winners set
- **THEN** a lose message is shown ("😬 Thick + Pepper — not this time!")

#### Scenario: Double-tap guard
- **WHEN** an order animation is in progress
- **THEN** the Order button is disabled until the animation completes

### Requirement: Heatmap after 20 orders
After 20 or more orders, each grid cell SHALL display a count badge showing how many times it was ordered. A message SHALL indicate whether the spread looks even.

#### Scenario: Heatmap appears after 20 orders
- **WHEN** the player has placed at least 20 orders
- **THEN** each cell shows a count badge and a heatmap title appears

#### Scenario: Even spread message
- **WHEN** all cells have been ordered at least once and no cell's count exceeds 1.5× the expected average (orders ÷ total cells)
- **THEN** the message reads "Looks pretty even!"

#### Scenario: Uneven spread message
- **WHEN** any cell has zero orders or any cell's count exceeds 1.5× the expected average
- **THEN** the message reads "Keep ordering — it'll even out!"

### Requirement: Reset button
The player SHALL be able to reset all orders while keeping the current menu and winner selection.

#### Scenario: Reset clears orders
- **WHEN** the player taps "Reset"
- **THEN** all order history is cleared, heatmap badges return to zero, and the order count resets to 0

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
