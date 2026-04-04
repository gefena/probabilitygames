const diceDetectiveQuestions = [
  {
    key: 'q1',
    question: 'Why do we count outcomes before calculating probability?',
    answers: [
      { key: 'a', text: 'Probability = (matching outcomes) ÷ (total outcomes) — you need the count first' },
      { key: 'b', text: 'Counting is easier than fractions' },
      { key: 'c', text: 'You only need to count when the dice are the same colour' },
      { key: 'd', text: 'Probability doesn\'t use counting at all' },
    ],
    correct: 'a',
    explanation: 'Probability is always a fraction: how many outcomes match your condition divided by how many total outcomes there are. Counting the matching cells in the grid is exactly that first step.',
  },
  {
    key: 'q2',
    question: 'In the 4×4 grid, what do the rows and columns represent?',
    answers: [
      { key: 'a', text: 'Rows = red die faces, columns = blue die faces — each cell is one possible outcome' },
      { key: 'b', text: 'Rows = winning outcomes, columns = losing outcomes' },
      { key: 'c', text: 'Rows = blue die faces, columns = red die faces' },
      { key: 'd', text: 'Each row is one round of the game' },
    ],
    correct: 'a',
    explanation: 'The grid maps every red-die face (rows) against every blue-die face (columns). Each of the 16 cells is one distinct outcome when both dice are rolled together.',
  },
  {
    key: 'q3',
    question: 'You want to count outcomes with at least one triangle. Die A has 2 triangles, Die B has 1 triangle. Why is the answer NOT 2+1=3?',
    answers: [
      { key: 'a', text: 'Because some cells have a triangle on BOTH dice and would be counted twice with simple addition' },
      { key: 'b', text: 'Because you must multiply instead: 2 × 1 = 2' },
      { key: 'c', text: 'Because at-least-one is always 16 minus the total' },
      { key: 'd', text: 'Because only one die matters for at-least-one questions' },
    ],
    correct: 'a',
    explanation: 'Simple addition double-counts cells where both dice show a triangle. The correct method is: 16 total − (cells with NO triangle) = 16 − (4−2)×(4−1) = 16 − 6 = 10. This is called the complement rule.',
  },
]

export default diceDetectiveQuestions
