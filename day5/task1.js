const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day5/input.txt');
const rows = splitTextToArray(inputData);
const rawCratesState = rows
  .filter((row) => row !== '' && !row.includes('move'))
  .reverse()
  .slice(1);

const crateStacks = rawCratesState.reduce((acc, row) => {
  let previosEndIndex;
  const stacksCount = 9;
  for (let i = 0; i < stacksCount; i++) {
    const startIndex = previosEndIndex ? previosEndIndex + 1 : 0;
    const endIndex = startIndex + 3;
    previosEndIndex = endIndex;
    const crateName = row.slice(startIndex, endIndex);

    if (!acc[i]) {
      acc[i] = [];
    }
    if (crateName !== '   ') {
      acc[i].push(crateName.split('')[1]);
    }
  }

  return acc;
}, []);

const actions = rows.filter((row) => row.includes('move'));

actions.forEach((action) => {
  const value = action.split(' ');
  const cratesLengthToMove = parseInt(value[1], 10);
  const fromStackIndex = parseInt(value[3], 10) - 1;
  const toStackIndex = parseInt(value[5], 10) - 1;

  for (let i = 0; i < cratesLengthToMove; i++) {
    const fromTop = crateStacks[fromStackIndex].pop();

    crateStacks[toStackIndex].push(fromTop);
  }
});

// QMBMJDFTD
const result = crateStacks.map((stack) => stack[stack.length - 1]).join('');

console.log({ result });
