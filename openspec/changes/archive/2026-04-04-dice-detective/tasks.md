## 1. i18n — English keys

- [x] 1.1 Add `diceDetective.title`, `.subtitle`, `.howToPlay`, `.dieA`, `.dieB`, `.round` to en.json
- [x] 1.2 Add tap-mode keys: `.tapInstruction`, `.submit`, `.next`, `.finish`, `.correct`, `.wrong`, `.missed` to en.json
- [x] 1.3 Add count-mode keys: `.countInstruction` to en.json
- [x] 1.4 Add question template keys: `.q.oneDie`, `.q.bothSame`, `.q.atLeastOne`, `.q.exactlyOne`, `.q.differentShapes` to en.json
- [x] 1.5 Add shape name keys: `.shape.triangle`, `.shape.square`, `.shape.circle` to en.json
- [x] 1.6 Add explanation keys: `.explain.oneDie`, `.explain.bothSame`, `.explain.atLeastOne`, `.explain.exactlyOne`, `.explain.differentShapes` to en.json
- [x] 1.7 Add end-screen keys: `.results.title`, `.results.score`, `.results.perfect`, `.results.good`, `.results.keep`, `.results.again` to en.json
- [x] 1.8 Add `home.games.diceDetective.title` and `.desc` to en.json

## 2. i18n — Hebrew keys

- [x] 2.1 Add all `diceDetective.*` keys to he.json (matching structure from task 1)
- [x] 2.2 Add `home.games.diceDetective.title` and `.desc` to he.json

## 3. Core logic — dice generation

- [x] 3.1 Implement `randomDie()`: returns string[4] with 2–3 distinct shapes, distribution from [[2,2],[2,1,1],[3,1]]
- [x] 3.2 Implement `countShape(die, shape)`: returns number of faces on die matching shape
- [x] 3.3 Implement `computeAnswer(template, shape, dieA, dieB)`: applies the formula for each of the 5 templates
- [x] 3.4 Implement `generateRound(roundIndex)`: loop up to 100 attempts, return `{ dieA, dieB, template, shape, answer }` with answer 1–15; fallback to hardcoded safe config if loop exhausts

## 4. Core logic — matching cells

- [x] 4.1 Implement `matchingCells(template, shape, dieA, dieB)`: returns Set of cell indices (0–15) that satisfy the condition
- [x] 4.2 Implement `buildSampleSpace(dieA, dieB)`: returns array of 16 `{shapeA, shapeB}` objects in row-major order (row = dieA face, col = dieB face)

## 5. Shape SVG component

- [x] 5.1 Create `ShapeSVG` component: props `shape` ('triangle'|'square'|'circle'), `size`, `color` — renders inline SVG using the three polygon/rect/circle paths from design
- [x] 5.2 Verify all three shapes render correctly at small size (16px) in both red and blue colours

## 6. Grid component

- [x] 6.1 Create `OutcomeGrid` component: renders 4×4 grid with header row (die B, blue) and header column (die A, red)
- [x] 6.2 Each cell renders two `ShapeSVG` instances (die A shape on top, die B shape below)
- [x] 6.3 In tap mode: cells are tappable buttons with toggle highlight (selected = ring outline)
- [x] 6.4 In revealed state: cells receive a `status` prop ('correct'|'wrong'|'missed'|'neutral') and render the appropriate colour (green/red/amber/none)
- [x] 6.5 In count mode revealed state: matching cells highlight green, all others remain neutral

## 7. Round UI — tap mode (rounds 1–2)

- [x] 7.1 Render tap instruction text and question above the grid
- [x] 7.2 Render Submit button, disabled when no cells are selected
- [x] 7.3 On submit: compute correct/wrong/missed sets, apply cell statuses, show feedback message and explanation line
- [x] 7.4 Show Next Round button after reveal

## 8. Round UI — count mode (rounds 3–5)

- [x] 8.1 Render count instruction text and question above the grid
- [x] 8.2 Render numeric input + Submit button, disabled when input is empty
- [x] 8.3 On correct submit: highlight matching cells green, show "✓ Correct!" and explanation line
- [x] 8.4 On wrong submit: shake input animation, show correct answer, highlight matching cells green anyway
- [x] 8.5 Show Next Round button after reveal

## 9. Round transitions and session flow

- [x] 9.1 Generate all 5 rounds at session start with `generateRound(0..4)`
- [x] 9.2 Animate new round entry: stagger die face appearance (200ms each, 8 faces total)
- [x] 9.3 Track `firstAttemptCorrect[round]` boolean for end-screen score

## 10. End screen

- [x] 10.1 Render end screen after round 5 reveal: score line, message (perfect/good/keep), Play Again button
- [x] 10.2 Play Again resets all 5 rounds to fresh generated configs

## 11. Integration

- [x] 11.1 Create `src/pages/DiceDetectivePage.jsx` with `GamePageLayout` wrapper
- [x] 11.2 Add `/dice-detective` route in `src/App.jsx`
- [x] 11.3 Add Dice Detective card to the "Go Deeper" tier in `src/pages/HomePage.jsx`
- [x] 11.4 Create `src/quizzes/diceDetective.js` with 3 conceptual questions (why counting before probability, what the grid rows/columns mean, complement counting for at-least-one)
- [x] 11.5 Render `QuizPanel` below the game in `DiceDetectivePage.jsx`
