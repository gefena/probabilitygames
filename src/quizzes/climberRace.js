const climberRaceQuestions = [
  {
    question: 'The spinner shows: Sunny 40%, Blaze 20%, Storm 30%, Ivy 10%. You bet on Sunny OR Storm. What is your chance of winning this spin?',
    a: '70% — because P(Sunny OR Storm) = 40% + 30% = 70%',
    b: '35% — because you split the chance between two climbers',
    c: '50% — because you picked two out of four climbers',
    answer: 'a',
    explanation: 'Sunny and Storm cannot both win the same spin — they are mutually exclusive. So you just add: P(Sunny OR Storm) = P(Sunny) + P(Storm) = 40% + 30% = 70%. The combined arc on the spinner shows this directly — the two sectors sit side by side and their sizes add up.',
  },
  {
    question: 'The spinner changes every turn. Last turn Ivy covered 50%. This turn Ivy covers only 15%. Should you keep your bet on Ivy?',
    a: 'No — check the new arc size. A 15% arc means Ivy only wins about 1 in 7 spins now.',
    b: 'Yes — Ivy was lucky last turn so she is due to win again.',
    c: 'It doesn\'t matter — the spinner change has no effect on Ivy\'s real chance.',
    answer: 'a',
    explanation: 'The spinner is re-randomised every turn. Last turn\'s percentages have no effect on this turn. A 15% arc means Ivy\'s probability this spin is 15% — about 1 in 7. The arc is the probability. Always re-read it before you spin, and consider switching your bet if the odds have shifted.',
  },
  {
    question: 'Why can you ADD probabilities when you bet on two climbers, but not when you bet on two dice outcomes that might overlap?',
    a: 'Because two climbers can\'t both win the same spin — they are mutually exclusive, so there is no overlap to worry about.',
    b: 'Because the spinner is fair, so adding always gives the right answer.',
    c: 'Because two climbers together always cover more than half the wheel.',
    answer: 'a',
    explanation: 'The addition rule P(A OR B) = P(A) + P(B) only works when A and B cannot happen at the same time — called mutually exclusive events. A spinner can land on exactly one colour per spin, so two different climbers can never both win simultaneously. That means there is no overlap to subtract, and simple addition gives the correct probability. If outcomes could overlap (like rolling above 3 AND rolling even), you would need to subtract the overlap.',
  },
]

export default climberRaceQuestions
