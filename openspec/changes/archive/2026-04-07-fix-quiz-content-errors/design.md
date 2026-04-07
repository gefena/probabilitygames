## Context

Quiz content lives exclusively in `src/i18n/en.json` and `src/i18n/he.json` under nested `quiz.<game>.<qN>.<key>` paths. The JS quiz files (e.g. `src/quizzes/bridgeQuest.js`) only reference translation keys and `correct: true/false` flags — they do not contain display text. All four fixes are pure string changes; no logic files need to be touched.

## Goals / Non-Goals

**Goals:**
- Fix four specific translation strings that contain false facts, misleading reasoning, or a correct answer marked wrong
- Keep both `en.json` and `he.json` in sync

**Non-Goals:**
- Changing `correct: true/false` flags in any quiz JS file
- Rewriting explanations beyond the minimum needed to fix the stated error
- Reviewing or updating any other quiz content

## Decisions

**BridgeQuest Q1 option a** — Replace the label text with one that references the actual calculation rather than a "fewer bridges" heuristic.
- New EN: `"Path B — 60% survival beats Path A's 80% × 70% = 56%"`
- Rationale: the math is already in option b's label as a distractor; mirroring it in the correct answer makes the correct reasoning explicit to students who read the option.

**MontyHall Q2 option a** — Replace the currently-correct-but-marked-wrong text with the classic 50/50 fallacy that it incorrectly represents.
- New EN: `"It doesn't matter whether you switch — eliminating one door makes the remaining two equally likely at 50% each"`
- Rationale: this is the exact misconception option c is designed to debunk. It is clearly false, so the `correct: false` flag is appropriate. The old text was actually true.

**BirthdayRoom Q2 explanation** — Replace `"N new pairs"` with `"N−1 new pairs"` and `"N-1 people already in the room"`.
- Rationale: minimal surgical fix; the example numbers (45, 190, 435) are already correct and stay unchanged.

**RemoveOne Q3 option c** — Replace `"there are only 2 ways to roll a 2"` with `"there is only 1 way to roll a 2 (1+1)"`.
- Rationale: corrects the false factual claim while keeping the distractor's wrong answer (2 rolls) intact. The distractor remains pedagogically useful — students must recognize that 1 combination ≠ 2 expected rolls.

## Risks / Trade-offs

- Hebrew translations are hand-written; any phrasing change needs a human review pass to confirm naturalness. The fixes here are minimal.
- No regression risk in logic — JS quiz files are untouched.
