## 1. Shared QuizPanel Component

- [x] 1.1 Create `src/components/QuizPanel.jsx` with props: `questions` (array), `accentColor` (Tailwind border class). Manage `currentIndex`, `selected`, and `revealed` as local state.
- [x] 1.2 Render the current question text (via `t(question.question)`) and its options as clickable buttons; disable all options once `revealed` is true
- [x] 1.3 On correct answer: highlight selected option green, play Framer Motion scale-in check animation, show explanation
- [x] 1.4 On incorrect answer: apply red tint + subtle shake to selected option (Framer Motion), highlight correct option green, show explanation
- [x] 1.5 Render "Next question →" button (hidden until `revealed`); on click advance `currentIndex` (mod bank length) and reset `selected`/`revealed`
- [x] 1.6 Style the panel: white card with rounded-3xl, left accent border using `accentColor` prop (matching ExplainerPanel style), question in bold, options as pill buttons, explanation in a lightly shaded box

## 2. Question Bank Files

- [x] 2.1 Create `src/quizzes/coinFlip.js` exporting 3 questions: biased coin identification, gambler's fallacy (independence), and fair coin long-run expectation
- [x] 2.2 Create `src/quizzes/luckyDice.js` exporting 3 questions: loaded die probability (weight shares), most likely 2-dice sum, bell curve extremes (3 vs 10 with 3 dice)
- [x] 2.3 Create `src/quizzes/candyJar.js` exporting 3 questions: doubling effect on ratio, equal-probability composition, zero-count edge case
- [x] 2.4 Create `src/quizzes/magicSpinner.js` exporting 3 questions: relative weight probability (A=3, B=1, C=2), fair spinner identification, doubling a slice weight
- [x] 2.5 Create `src/quizzes/cardDraw.js` exporting 3 questions: hearts probability after drawing hearts, non-suit draw effect on hearts %, with-replacement contrast

## 3. i18n Strings

- [x] 3.1 Add `quiz.coin.*` keys to `en.json` and `he.json`: question texts, option labels, and explanation strings for all 3 coin flip questions
- [x] 3.2 Add `quiz.dice.*` keys to `en.json` and `he.json`: question texts, option labels, and explanation strings for all 3 dice questions
- [x] 3.3 Add `quiz.candy.*` keys to `en.json` and `he.json`: question texts, option labels, and explanation strings for all 3 candy jar questions
- [x] 3.4 Add `quiz.spinner.*` keys to `en.json` and `he.json`: question texts, option labels, and explanation strings for all 3 spinner questions
- [x] 3.5 Add `quiz.cardDraw.*` keys to `en.json` and `he.json`: question texts, option labels, and explanation strings for all 3 card draw questions
- [x] 3.6 Add `quiz.next` (Next question button label) and `quiz.title` (panel header, e.g. "Test Your Understanding") to both locale files

## 4. Wire QuizPanel into Each Game Page

- [x] 4.1 Add `<QuizPanel questions={coinFlipQuestions} accentColor="border-violet-400" />` to `CoinFlipPage.jsx` below the ExplainerPanel
- [x] 4.2 Add `<QuizPanel questions={diceQuestions} accentColor="border-orange-400" />` to `LuckyDicePage.jsx` below the ExplainerPanel(s)
- [x] 4.3 Add `<QuizPanel questions={candyJarQuestions} accentColor="border-pink-400" />` to `CandyJarPage.jsx` below the ExplainerPanel
- [x] 4.4 Add `<QuizPanel questions={spinnerQuestions} accentColor="border-emerald-400" />` to `MagicSpinnerPage.jsx` below the ExplainerPanel
- [x] 4.5 Add `<QuizPanel questions={cardDrawQuestions} accentColor="border-blue-400" />` to `CardDrawPage.jsx` below the ExplainerPanel
