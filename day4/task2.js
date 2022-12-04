const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day4/input.txt');

const rows = splitTextToArray(inputData);

const calculateRangeFromString = (rangeString) => {
  const [rangeStart, rangeFinish] = rangeString.split('-');

  return { start: parseInt(rangeStart, 10), finish: parseInt(rangeFinish, 10) };
};

const areRangesIntercepts = (rangeOne, rangeTwo) => rangeOne.start <= rangeTwo.finish && rangeOne.finish >= rangeTwo.start;

const result = rows
  .map((row) => row.split(','))
  .map((rangePair) => rangePair.map(calculateRangeFromString))
  .reduce((acc, [rangeOne, rangeTwo]) => (areRangesIntercepts(rangeOne, rangeTwo) ? acc + 1 : acc), 0);

console.log({ result });
