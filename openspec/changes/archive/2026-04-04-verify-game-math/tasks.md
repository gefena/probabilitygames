## 1. Fix Greedy Pig Q1 answer label (en.json)

- [x] 1.1 In `src/i18n/en.json`, update key `quiz.greedyPig.q1.a` from `"About 3 points — the average of 2,3,4,5,6 minus the risk of losing 18"` to `"Barely positive — about 0.33 points (the average of 2,3,4,5,6 minus the bust risk)"`
- [x] 1.2 Verify that the updated label is consistent with the Q1 explanation text which reads `"(5/6) × 4 − 3 = 3.33 − 3 = 0.33 points. Barely positive!"`

## 2. Fix Greedy Pig Q1 answer label (he.json)

- [x] 2.1 In `src/i18n/he.json`, update key `quiz.greedyPig.q1.a` from `"כ-3 נקודות — ממוצע 2,3,4,5,6 פחות הסיכון לאבד 18"` to the Hebrew equivalent of `"Barely positive — about 0.33 points (the average of 2,3,4,5,6 minus the bust risk)"` — suggested: `"כמעט אפס — כ-0.33 נקודות (ממוצע 2,3,4,5,6 פחות סיכון הפיצוץ)"`

## 3. Fix Greedy Pig explainer example (en.json)

- [x] 3.1 In `src/i18n/en.json`, update key `greedyPig.explainer.example` to clarify that "3 points" refers to the gross expected contribution from non-bust rolls, not the full net EV. Change `"The expected gain from one more roll is only about 3 points."` to `"The expected gain from non-bust rolls is about 3 points — but subtract the 1-in-6 bust risk and the net expected value is much lower."`

## 4. Fix Greedy Pig explainer example (he.json)

- [x] 4.1 In `src/i18n/he.json`, update key `greedyPig.explainer.example` similarly: change `"הרווח הצפוי מגלגול נוסף הוא בערך 3 נקודות בלבד."` to the Hebrew equivalent of the clarified English text — suggested: `"הרווח הצפוי מגלגולים שאינם פיצוץ הוא כ-3 נקודות — אך אחרי הפחתת סיכון הפיצוץ 1 מתוך 6, הערך הצפוי נטו נמוך בהרבה."`

## 5. Fix Lucky Combo Q3 explanation contradiction (en.json)

- [x] 5.1 In `src/i18n/en.json`, update key `quiz.luckyCombo.q3.explanation`: remove the sentence `"Both answers (a) and (c) are correct!"` so the explanation only validates option A. Replace with wording that explains why A is correct without endorsing C as equally valid — e.g., start directly with `"For AND to succeed, Event A must occur AND Event B must also occur. That's a stricter requirement than just one of them. Mathematically, multiplying two fractions (both < 1) always makes a smaller fraction."`

## 6. Fix Lucky Combo Q3 explanation contradiction (he.json)

- [x] 6.1 In `src/i18n/he.json`, update key `quiz.luckyCombo.q3.explanation`: remove `"שתי תשובות (א) ו-(ג) נכונות!"` and start directly with the remaining explanation text — e.g., `"כדי ש-AND יצליח, גם אירוע A וגם אירוע B חייבים לקרות. זו דרישה מחמירה יותר מסתם אחד מהם. מבחינה מתמטית, הכפלת שני שברים (שניהם קטנים מ-1) תמיד נותנת שבר קטן יותר."`
