## Context

The app has 14 game pages using a consistent pattern: `GamePageLayout` wrapper, interactive simulation area, stats display, `ExplainerPanel`, `QuizPanel`. Both new games follow this exact pattern — no new architecture, just new pages wired into existing router/i18n/quiz systems.

The core mechanic for both games is the same: a hidden secret is generated at mount; the player submits guesses character-by-character; each guess reveals whether that position is hit or miss; probability display updates to show how much of the search space remains.

## Goals / Non-Goals

**Goals:**
- Two pages with the shared guess mechanic feeling distinct through alphabet size and framing
- Length configurability via a compact selector (not a text input — preset buttons 1–5 for both games, defaulting to 1)
- Real-time probability display: "1 in X remaining possibilities" shrinks with each correct digit
- Win state with confetti-style celebration (reuse Framer Motion)
- History of guesses shown inline (like Wordle-style row feedback, but digit-based)
- ExplainerPanel explaining independence of trials and search space
- QuizPanel with 3–4 questions each
- Full EN + HE i18n

**Non-Goals:**
- Timed challenge mode
- Multiplayer / leaderboard
- Saving progress between sessions
- Sound effects

## Decisions

### 1. Shared mechanic, separate pages (not a single configurable page)

Each game has its own page (`GuessThePhonePage`, `HackThePasswordPage`) with its own route, i18n namespace, and explainer. They share no stateful component — only the visual pattern.

**Why:** The framing and explainer content are meaningfully different (phone number = pure decimal, 10^N possibilities; password = alphabet^M, illustrates exponential blowup). A single generic page would muddy the educational narrative.

### 2. Length selector as preset buttons, not free input

Phone: `[1, 2, 3, 4, 5]` digits. Password: `[1, 2, 3, 4, 5]` chars. Default is 1. Selecting a new length resets the game.

**Why:** Starting at length 1 (trivially easy — 1 in 10) and stepping to length 5 (1 in 100,000+) makes the exponential explosion viscerally clear in just a few taps. The point is NOT to finish a long game — it's to feel why a 5-digit PIN is much harder than a 1-digit one. The explainer reinforces this: most kids won't bother finishing length 4 or 5, and that's the lesson. Free numeric input is excluded to avoid absurd lengths and keep focus on the educational presets.

### 3. Guess mechanic: one digit/char at a time, position-aware

The player selects a position index and submits a character guess. Correct guesses lock in (green). Wrong guesses increment a counter but don't reveal the answer. The secret is only fully revealed on win or explicit give-up.

**Why:** Position-aware guessing mirrors how real search-space problems work (each independent variable narrows the total). It also makes the probability math clean: remaining space = product of remaining options per unlocked position.

### 4. Probability display: remaining combinations

Show `1 in [product of remaining options per position]`. For phone, each unguessed position contributes ×10; for password, ×alphabet_size. When a position is solved it contributes ×1 (no longer a variable).

**Why:** This is the core learning — seeing the number collapse from 10,000,000 to 1 as you crack each digit makes the multiplicative rule tangible.

### 5. Password alphabet difficulty tiers

- **Easy**: digits only (0–9), alphabet size 10 — identical math to phone
- **Medium**: lowercase letters + digits (36 chars)
- **Hard**: lowercase + uppercase + digits (62 chars)

Symbols excluded deliberately (too frustrating to type on mobile).

**Why:** Difficulty selector teaches alphabet-size impact without changing length, giving kids a second lever to see exponential growth.

### 6. Guess history as a grid of chips

Each submitted guess shown as a row of chips: position index, guessed char, ✓/✗. Most recent at top. Cap display at last 10 guesses.

**Why:** Keeps the UI compact; mirrors familiar Wordle-style feedback.

## Risks / Trade-offs

- **Mobile keyboard handling**: Single-character input on mobile can be clunky. Mitigation: use a letter-grid picker (rendered buttons for each valid character) rather than a text `<input>`, avoiding keyboard popup issues entirely.
- **HE translations for letter grids**: The character grid itself (A–Z, 0–9) doesn't need translation — characters are universal. Only labels and instructions need HE keys.
- **Spoiler risk**: If the user inspects React DevTools they can see the secret in state. Acceptable for an educational app; no obfuscation needed.

## Migration Plan

1. Add two new page files + quiz files (no existing file changes needed until wiring)
2. Add i18n keys to en.json and he.json
3. Wire routes in App.jsx
4. Add section to HomePage.jsx
5. No rollback risk — purely additive

## Open Questions

- Home page placement: add to existing "Patterns in Chaos" section, or create a new "Crack the Code" section? → **Decision: new section** named "Crack the Code" (or equivalent i18n key), distinct dark-background card section like Patterns in Chaos, since the mechanic type is different.
