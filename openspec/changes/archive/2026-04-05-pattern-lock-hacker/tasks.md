## 1. New page: PatternLockHackerPage

- [x] 1.1 Create `src/pages/PatternLockHackerPage.jsx` with state: `secret` (array of dot indices), `attempt` (current drawn sequence), `attempts` count, `smudgeUsed`, `won`, `gaveUp`, `shake`
- [x] 1.2 Add `generateSecret(k)`: pick k random distinct indices from 0–8, return as ordered array
- [x] 1.3 Add `P(n, k)` helper and `factorial(k)` helper for the stats panel
- [x] 1.4 Implement `PatternGrid` SVG component: 3×3 dots at fixed positions, lines between consecutive clicked dots, sequence numbers on activated dots, large invisible click targets (r=24)
- [x] 1.5 Implement draw interaction: clicking an unactivated dot adds it to `attempt`; clicking an already-used dot does nothing; "Clear" resets `attempt` without incrementing attempts; show live counter "N / k dots" while drawing
- [x] 1.6 Implement "Submit" button (enabled when `attempt.length === k`): compare `attempt` to `secret` element-by-element; if match → `won = true`; if not → increment attempts, trigger shake, clear attempt after 500ms
- [x] 1.7 Implement Smudge Attack: set `smudgeUsed = true`; highlight the dots that are in `secret` (regardless of order); update stats display to show k! remaining
- [x] 1.8 Implement Give Up: reveal the secret by animating it step-by-step (500ms per dot); set `gaveUp = true`
- [x] 1.9 Implement win state: green grid flash, summary card showing attempts used and P(9,k) vs k!
- [x] 1.10 Add pattern length selector (4–9), matching the style of the existing length selectors

## 2. Wiring

- [x] 2.1 Add route `/pattern-lock-hacker`, import page component, and add to `PAGE_TITLES` map in `src/App.jsx`
- [x] 2.2 Add game card to the `crackTheCode` tier in `src/pages/HomePage.jsx`
- [x] 2.3 Add `common.games.pattern-lock-hacker` title key and `home.crackTheCode.patternLock.desc` to `en.json` and `he.json`
- [x] 2.4 Add cross-game suggestions in `src/data/gameConnections.js`: pattern-lock-hacker ↔ guess-the-phone, pattern-lock-hacker ↔ hack-the-password

## 3. i18n

- [x] 3.1 Add `patternLock.*` strings to `en.json`: title, emoji, subtitle, howToPlay, lengthLabel, attemptsLabel, possibleLabel, smudgeBtn, smudgeUsed, afterSmudge, submitBtn, clearBtn, giveUpBtn, wonTitle, wrongMsg, gaveUpMsg, reductionLabel, dotsCounter, explainer.*
- [x] 3.2 Add same strings to `he.json`

## 4. Quiz

- [x] 4.1 Create `src/quizzes/patternLockHacker.js` with 3–4 questions covering: P(9,4)=3024 vs 4-digit PIN (10,000), smudge attack reducing to k!, why order matters in patterns
