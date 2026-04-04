## Why

The existing games lean toward passive observation (watch distributions form, read charts). Adding two interactive guessing games — "Guess the Phone Number" and "Hack the Password" — gives kids a hands-on way to *feel* how probability collapses as they eliminate possibilities, making concepts like search space, independent trials, and combinatorics viscerally concrete.

## What Changes

- Add **GuessThePhonePage** — player guesses a hidden number digit-by-digit; length is user-configurable (4–10 digits); each digit draw is independent (0–9); tracks guesses, reveals hits, and shows the shrinking probability space.
- Add **HackThePasswordPage** — harder variant using alphanumeric characters (a–z + 0–9, optionally mixed case + symbols); length is user-configurable (3–8 chars); same mechanic but much larger alphabet illustrates exponential growth of the search space.
- Add both pages to the **Home page** as a new "Crack the Code" section (or alongside existing sections).
- Add routes, i18n keys (EN + HE), quiz questions, and ExplainerPanels for both.

## Capabilities

### New Capabilities

- `guess-phone-game`: Digit-guessing game — random N-digit number, user guesses one digit at a time, feedback on hit/miss, probability display, win detection.
- `hack-password-game`: Alphanumeric guessing game — random password of length M from a configurable alphabet, same guess mechanic with larger search space, difficulty selector (easy/medium/hard maps to alphabet size).

### Modified Capabilities

- `i18n-completeness`: New i18n keys for both games (EN + HE) must satisfy existing key-parity requirement.
- `site-shell`: Home page gets a new section card for both games; routes added to App.jsx.

## Impact

- New files: `src/pages/GuessThePhonePage.jsx`, `src/pages/HackThePasswordPage.jsx`
- New quiz files: `src/quizzes/guessThePhone.js`, `src/quizzes/hackThePassword.js`
- Modified: `src/App.jsx` (2 new routes), `src/pages/HomePage.jsx` (new section), `src/i18n/en.json`, `src/i18n/he.json`
- No new dependencies required
