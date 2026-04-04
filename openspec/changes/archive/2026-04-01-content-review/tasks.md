## 1. Fix Hardcoded Strings (i18n completeness)

- [x] 1.1 Add `mysteryMachine.tableOutput` key to `en.json` ("Output") and `he.json` ("פלט"); replace the hardcoded `"Output"` `<th>` in `src/pages/MysteryMachinePage.jsx` with `{t('mysteryMachine.tableOutput')}`
- [x] 1.2 Add `birthdayRoom.tooltipSeries` key to `en.json` ("P(match)") and `he.json` ("P(התאמה)"); update the `<Tooltip formatter>` in `src/pages/BirthdayRoomPage.jsx` to use `t('birthdayRoom.tooltipSeries')` instead of the hardcoded `'P(match)'` string; reuse the existing `birthdayRoom.people` key for the label formatter

## 2. Age-Appropriate Content

- [x] 2.1 In `en.json`, update `prizeMachine.explainer.example` to replace the multi-step decimal formula with a plain "play 100 times" framing: *"Play 100 times and you'd expect to lose about 470 coins in total (around 4–5 coins per play on average). That's how prize machines make a profit over time!"*; update the matching Hebrew key in `he.json`
- [x] 2.2 In `en.json`, update `quiz.coin.q2.explanation` to remove the phrase "This common mistake is called the Gambler's Fallacy." — keep the rest of the explanation intact; update the matching Hebrew key in `he.json`
