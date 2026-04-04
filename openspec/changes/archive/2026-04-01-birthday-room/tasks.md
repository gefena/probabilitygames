## 1. Room Builder

- [x] 1.1 Create `src/pages/BirthdayRoomPage.jsx` with state: `people` (array of {id, birthday, color}), `matchPairs` (array of [id,id] pairs)
- [x] 1.2 Render avatar circles in a flex-wrap grid; each shows the birthday number; cap display at 40 avatars (show "+N more" beyond that)
- [x] 1.3 "Add Person" button: assign random birthday 1–365, check for collision with existing birthdays using a Set, add to `people`, update `matchPairs` if collision found
- [x] 1.4 Disable "Add Person" at 60 people

## 2. Match Animation

- [x] 2.1 When `matchPairs` is non-empty, apply a Framer Motion pulse animation to matched avatars and show a "Match found! 🎉" banner
- [x] 2.2 Matched avatars use a shared highlight color distinct from their base color

## 3. Probability Meter

- [x] 3.1 Compute exact probability P(match) = 1 − Π((365−i)/365) for i=0..n−1 iteratively; display as a percentage and a color-filled meter bar
- [x] 3.2 Show a milestone callout when the room reaches 23 people ("50% — already past halfway!")

## 4. Probability Curve Chart

- [x] 4.1 Pre-compute the probability curve for n=1..60 on mount; render as a Recharts LineChart
- [x] 4.2 Add a reference dot/marker on the curve at the current room size, updating on each add

## 5. Simulation Mode

- [x] 5.1 "Simulate" button: run 1000 random rooms of the current room size synchronously; count how many had a match; display "X / 1000 had a match (X.X%) — theory says Y.Y%"

## 6. Reset and Explainer, Quiz, Route, i18n

- [x] 6.1 "Clear Room" button resets `people` and `matchPairs` to empty
- [x] 6.2 Add `ExplainerPanel` explaining why 23 people is enough (comparing N people, not just 1 pair)
- [x] 6.3 Add `QuizPanel` with 3 questions: how many people for 50% chance, why the probability grows quickly, what happens at 60 people
- [x] 6.4 Add quiz bank `src/quizzes/birthdayRoom.js` and `quiz.birthdayRoom.*` i18n keys
- [x] 6.5 Add `birthdayRoom.*` i18n keys to `en.json` and `he.json`
- [x] 6.6 Add route `/birthday-room` in `src/App.jsx` and home-page card (emoji 🎂, accent color rose)
