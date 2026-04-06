# Fix Quiz Answers

## Problem Description
As discovered during a review of the quiz files, there are three mistakes in the `galtonBoard` and `montyHall` quizzes:
1. `galtonBoard.js` Q1 incorrectly marks option `b` as the correct answer. The mathematically correct answer is option `c` ("Mostly in the middle bins, forming a bell shape").
2. `montyHall.js` Q1 incorrectly marks option `b` as the correct answer. The statistically correct answer is option `c` ("2/3 — switching wins twice as often as staying").
3. The translation string for Monty Hall Q2 option `c` is logically backwards. It says "50/50 is only wrong if the host picks randomly", but 50/50 is actually wrong because the host **does not** pick randomly.

## Plan & Specification

### 1. Fix `src/quizzes/galtonBoard.js`
*   Locate `q1` in `src/quizzes/galtonBoard.js`.
*   Change `{ label: 'quiz.galtonBoard.q1.b', correct: true }` to `correct: false`.
*   Change `{ label: 'quiz.galtonBoard.q1.c', correct: false }` to `correct: true`.

### 2. Fix `src/quizzes/montyHall.js`
*   Locate `q1` in `src/quizzes/montyHall.js`.
*   Change `{ label: 'quiz.montyHall.q1.b', correct: true }` to `correct: false`.
*   Change `{ label: 'quiz.montyHall.q1.c', correct: false }` to `correct: true`.

### 3. Fix `src/i18n/en.json`
*   Locate `montyHall.q2.c` in `src/i18n/en.json`.
*   Change the string from `"50/50 is only wrong if the host picks randomly"` to `"50/50 is wrong because the host DOES NOT pick randomly"`.

### 4. Fix `src/i18n/he.json`
*   Locate `montyHall.q2.c` in `src/i18n/he.json`.
*   Change the string from `"50/50 שגוי רק אם המארח בוחר באקראי"` to `"50/50 שגוי כי המארח לא בוחר באקראי"` (meaning "50/50 is wrong because the host does not pick randomly").
