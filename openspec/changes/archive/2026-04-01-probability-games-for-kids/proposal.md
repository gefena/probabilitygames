## Why

Kids aged 10 struggle to grasp probability intuitively — textbooks are abstract and dry. An interactive, game-based web site lets children *discover* probability through play, building genuine intuition through experimentation rather than rote memorization. Bilingual (English + Hebrew) support makes the site accessible to a wider audience.

## What Changes

- Build a new standalone web site with a modern, playful visual design targeting 10-year-old learners
- Implement 5 interactive probability games, each teaching a distinct concept through hands-on play
- Add full English / Hebrew localization with RTL layout support for Hebrew
- Include a visual "results dashboard" in each game to show probability building up over repeated trials

## Capabilities

### New Capabilities

- `site-shell`: Top-level app shell — navigation, theme, i18n provider, RTL/LTR switching, home page with game cards
- `coin-flip-lab`: Flip a coin (single or many at once); watch the heads/tails ratio approach 50 % live; adjustable number of flips per round
- `lucky-dice`: Roll 1–3 dice; predict which sum or face appears most; bar chart updates in real time to reveal the distribution
- `candy-jar`: Pick colored candies from a jar without looking; adjust jar composition; learn that more candies of one color = higher chance of picking it
- `magic-spinner`: Customizable pie-slice spinner; resize slices with +/− weight controls; spin and record where it lands; compare actual vs. expected frequency
- `card-draw`: Draw cards from a shuffled deck; predict probability of drawing a specific suit or rank; deck shrinks with each draw showing conditional probability

### Modified Capabilities

*(none — this is a greenfield project)*

## Impact

- New project in `/home/aristo/git_projects/probability_games`
- Tech stack to be decided in design (likely React + Vite; i18next for localization; Framer Motion or CSS animations for visual appeal)
- No backend required — fully client-side with local state
- Responsive design needed (desktop + tablet; mobile nice-to-have)
