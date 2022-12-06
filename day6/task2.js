const { readFile } = require('../shared.js');
const _ = require('lodash');
const inputData = readFile('./day6/input.txt');

const areAllLettersDifferent = (line) => {
  const letters = line.split('');
  return _.uniq(letters).length === letters.length;
};

let result;

for (let i = 0; i < inputData.length; i++) {
  const sublineToCheck = inputData.slice(i, i + 14);
  if (areAllLettersDifferent(sublineToCheck)) {
    result = i + 14;
    break;
  }
}

console.log({ result });
