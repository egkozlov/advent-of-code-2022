const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day2/input.txt');

const rounds = splitTextToArray(inputData);
const resultsMap = {
  X: {
    A: 'Z',
    B: 'X',
    C: 'Y',
  },
  Y: {
    A: 'X',
    B: 'Y',
    C: 'Z',
  },
  Z: {
    A: 'Y',
    B: 'Z',
    C: 'X',
  },
};

const variantsMap = {
  X: {
    shapeScore: 1,
    outcomeScores: { A: 3, B: 0, C: 6 },
  },
  Y: {
    shapeScore: 2,
    outcomeScores: { A: 6, B: 3, C: 0 },
  },
  Z: {
    shapeScore: 3,
    outcomeScores: { A: 0, B: 6, C: 3 },
  },
};

const totalScore = rounds.reduce((acc, round) => {
  const [opponentVarint, expectedResult] = round.split(' ');
  const myVariant = resultsMap[expectedResult][opponentVarint];
  const variantScoreMap = variantsMap[myVariant];
  return acc + variantScoreMap.shapeScore + variantScoreMap.outcomeScores[opponentVarint];
});

console.log({ totalScore });
