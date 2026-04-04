## Context

The Birthday Problem requires generating random birthdays for each person and checking for collisions. The math is exact: P(no match with n people) = (365/365) × (364/365) × … × ((365−n+1)/365). This can be shown analytically AND simulated.

## Goals / Non-Goals

**Goals:**
- "Add person" button adds one person with a random birthday (1–365)
- Room shows avatars (simple colored circles with initials or a number) with their birthday shown on hover/below
- When a match is found: animated highlight on the two matching people, confetti-style Framer Motion burst
- Probability meter: shows exact P(at least one match) for current room size, computed analytically
- "Clear room" resets to zero people
- Simulation mode: "Run 1000 rooms of N people" — shows what % had at least one match, vs. the exact probability
- Chart: probability curve from 1 to 60 people with current room size marked

**Non-Goals:**
- Real names / custom birthdays
- More than 60 people in one room (curve flattens to ~99% by then)

## Decisions

### Decision 1: Exact probability formula

Use the complement: P(match) = 1 − P(no match) = 1 − (365! / ((365−n)! × 365^n))

Computed iteratively (multiply running product by (365−i)/365 for i=0..n−1). No factorial overflow because we multiply incrementally.

### Decision 2: Birthday collision detection

Store each person's birthday in an array. On each add, check if the new birthday already exists in the array using a Set. O(1) lookup.

### Decision 3: Avatar display

Simple colored circles — one color per "birthday group" (all people sharing a birthday get the same highlight color when a match is found). Before any match: all circles are light gray. After match: matched pair pulses in a vivid color.

### Decision 4: Simulation mode

Run entirely in JS synchronously (1000 simulations of n people is fast). Display result as "X out of 1000 rooms had a match (X.X%)". Show alongside the exact probability for comparison.

## Risks / Trade-offs

- **Risk: "Add person" spammed quickly** — Debounce or disable the button during the match-found animation (≈1 second).
- **Risk: Room gets crowded visually** — Cap the avatar grid at 40 visible avatars; show "+N more" beyond that.
