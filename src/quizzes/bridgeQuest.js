const bridgeQuestQuestions = [
  {
    question: 'Path A has two bridges: 80% and 70%. Path B has one bridge: 60%. Which path gives you a better chance of making it through?',
    a: 'Path B — it has only one bridge to cross, so there is only one chance to fall',
    b: 'Path A — 80% × 70% = 56%, which is still better than 60%',
    c: 'They are equal — both paths have the same total risk',
    answer: 'a',
    explanation: 'Path A survival: 80% × 70% = 56 in 100. Path B survival: 60 in 100. Even though Path A has two "decent" bridges, multiplying them together drops the odds below Path B\'s single scarier bridge. Every extra bridge multiplies your survival fraction — fewer bridges isn\'t always safer, but here Path B\'s single 60% beats Path A\'s 56%.',
  },
  {
    question: 'The Greedy Bot always picks the path whose scariest bridge is the least scary. Why does this strategy sometimes fail?',
    a: 'Because the bot ignores the number of bridges — a path with many medium bridges can be worse than one with a single scary bridge',
    b: 'Because the bot always picks randomly and gets lucky sometimes',
    c: 'Because the bot only looks at the last bridge on each path',
    answer: 'a',
    explanation: 'The Greedy Bot focuses on the worst single bridge and ignores everything else. A path like [50%, 99%, 99%] has a scary 50% bridge but a total survival of about 49%. A path like [70%, 70%, 70%] has no scary bridge, but 70% × 70% × 70% ≈ 34%. The bot would pick the second path — and lose. The correct strategy is to multiply all bridges and compare the totals.',
  },
  {
    question: 'You survive bridge 1 (80%) and bridge 2 (70%). You are now at bridge 3, which is 60%. What is your chance of making it through bridge 3?',
    a: '60% — each bridge is independent; surviving the first two does not change bridge 3\'s probability',
    b: '34% — because 80% × 70% × 60% is your total chance',
    c: '80% — because you\'ve already survived two bridges so you\'re on a lucky streak',
    answer: 'a',
    explanation: 'Bridge 3 is 60% regardless of what happened before. The bridges are independent events — your past crossings have no effect on the next one. The total path survival (80% × 70% × 60% ≈ 34%) is the probability you calculated at the start before crossing anything. Once you\'re standing at bridge 3 having already crossed bridges 1 and 2, the only relevant probability is 60%.',
  },
]

export default bridgeQuestQuestions
