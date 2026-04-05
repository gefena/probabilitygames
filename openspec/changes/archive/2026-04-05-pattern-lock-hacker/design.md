## Context

Two existing games in the "Crack the Code" tier teach independent-position multiplication. Pattern Lock adds permutation counting P(n,k) and the smudge attack concept. It uses a draw-to-guess interaction (SVG dot grid) rather than tap-a-digit.

**Simplified model** (no Android pass-through rule): the secret is any ordered sequence of k distinct dots from the 9 grid positions, where k is chosen by the player (4–9). This gives clean P(9,k) = 9!/(9-k)! counts.

## Goals / Non-Goals

**Goals:**
- Interactive 3×3 dot grid: click dots to draw a pattern, SVG lines connect them in sequence
- Secret: random ordered sequence of k dots generated at game start
- Feedback: correct → win state; wrong → shake animation, clear, try again
- Smudge Attack button: reveals which dots are in the secret (not order); updates counter to k! remaining
- Stats panel: total P(9,k) possibilities, attempts used, remaining after smudge
- Pattern length selector: 4–9 (like the length selector in existing games)
- Add to crackTheCode tier on HomePage
- Cross-game suggestions connecting to GuessThePhone and HackThePassword

**Non-Goals:**
- Android pass-through rule
- Touch/drag drawing (click-by-click is sufficient)
- Positional feedback ("2 dots in correct position") — binary right/wrong only

## Decisions

**Click-to-draw, not drag.** Click dots one by one; each click adds the dot to the current pattern attempt and draws a line from the previous dot. A dot that's already been clicked is ignored (can't reuse). "Clear" button resets the current attempt without counting as a try. "Submit" button appears when ≥ 4 dots are selected.

**Sequence numbers on dots.** When a dot is clicked, show the order number (1, 2, 3…) inside it. This makes the pattern readable and reinforces the "order matters" concept.

**Smudge attack: one-time hint.** Clicking "Smudge Attack" reveals which k dots belong to the secret by highlighting them. The possibilities counter updates from P(9,k) to k!. This is a one-time reveal (can't un-reveal). The button is always visible so players can choose when (or whether) to use it.

**Win/lose display.** On win: green flash on the grid, confetti, stats summary. On wrong: grid shakes briefly (CSS animation), lines turn red for 500ms, then clear. Wrong attempts are counted.

**Stats panel layout:**
```
Possible patterns: 3,024       ← P(9,k) initially
Smudge attack: Not used
After smudge: 24 orderings    ← k! (shown once smudge used)
Your attempts: 0
```

**Probability math shown:**
- Before smudge: `9 × 8 × 7 × 6 = 3,024` (for k=4)
- After smudge: `4 × 3 × 2 × 1 = 24`
- Reduction: "99.2% fewer tries!"

**Grid layout (SVG viewBox 0 0 200 200):**
```
(30,30)  (100,30)  (170,30)
(30,100) (100,100) (170,100)
(30,170) (100,170) (170,170)
```
Dot radius 16. Lines between connected dots. Sequence number text centered on each activated dot.

**Route:** `/pattern-lock-hacker`  
**Component:** `PatternLockHackerPage.jsx`  
**i18n namespace:** `patternLock`

## Risks / Trade-offs

- **SVG click targets on mobile**: dot radius 16 may be small — use a larger invisible click area (r=24 transparent circle) behind each dot
- **Trade-off**: binary feedback (right/wrong) means many attempts needed for long patterns — mitigated by the smudge button and the "give up" option that animates the solution
