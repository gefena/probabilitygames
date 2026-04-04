## Context

The site has 10+ pages with bilingual (EN/HE) content managed through react-i18next. A content audit identified three classes of issues: missing i18n wiring (hardcoded strings), content complexity mismatches for the 10-year-old audience, and Hebrew translation polish (arrow direction in RTL).

## Goals / Non-Goals

**Goals:**
- Zero hardcoded visible English strings in JSX — every user-facing string goes through `t()`
- All explanation text is accessible to a 10-year-old without prior maths knowledge
- Hebrew strings are grammatically correct and RTL-natural (arrows, punctuation flow)
- Add the 3 missing i18n keys that the hardcoded strings need

**Non-Goals:**
- Redesigning any game mechanics or adding new features
- Full professional Hebrew proofreading (out of scope; aim for clear and accurate)
- Changing any quiz correct/incorrect answers

## Decisions

### Decision 1: New i18n keys for MysteryMachinePage table header

The reveal table has a hardcoded `"Output"` `<th>`. Add `mysteryMachine.tableOutput` key in both locales and replace the hardcoded string.

### Decision 2: BirthdayRoomPage tooltip i18n

The Recharts `<Tooltip>` formatter uses `'P(match)'` and `'people'` as literal strings. Add `birthdayRoom.tooltipSeries` and reuse the existing `birthdayRoom.people` key (already in both locales) for the label formatter. For the series name, add `birthdayRoom.tooltipSeries: "P(match)"` in EN and `"P(התאמה)"` in HE.

### Decision 3: Simplify Prize Machine EV explainer example

Replace the multi-step decimal calculation with a plain-English "what happens over 100 plays" framing. Keep the formula in the `body` field (it's good), only simplify the `example` field.

**Before:** `"EV = (0.01×200) + (0.09×20) + (0.30×5) − 10 = 2 + 1.8 + 1.5 − 10 = −4.7 coins per play."`
**After:** `"Play 100 times and you'd expect to lose about 470 coins total (4.7 per play on average). That's how prize machines make a profit!"`

### Decision 4: Soften "Gambler's Fallacy" in Coin quiz

Remove the term "Gambler's Fallacy" from the explanation of coin quiz q2. The concept (coin has no memory) is already well-explained — the academic label adds nothing for a child and may confuse. Replace with a plain restatement.

**Before:** `"This common mistake is called the Gambler's Fallacy."`
**After:** (removed — concept already covered by surrounding sentences)

### Decision 5: RTL arrow directions

- `spinner.twoRounds.summary` in he.json uses `←` where the EN uses `→`. The string shows "Round 1 result → Round 2 result". In RTL Hebrew the visual reading order reverses, so `←` is correct; no change needed.
- `explainer.cards.before` and `explainer.cards.after` in he.json use `←` for `→`. Same logic applies — correct for RTL.
- No changes needed to arrow directions.

## Risks / Trade-offs

- **Risk: New key names clash** — Using namespaced keys (`mysteryMachine.tableOutput`, `birthdayRoom.tooltipSeries`) avoids any collision.
- **Risk: Softening EV example loses educational value** — Mitigated by keeping the full formula in the `body` field; only the worked example is simplified.
