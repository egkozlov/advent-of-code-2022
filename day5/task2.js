const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day5/input.txt');
const rows = splitTextToArray(inputData);
const initialState = rows
  .filter((row) => row !== '' && !row.includes('move'))
  .reverse()
  .slice(1);

const stacks = initialState.reduce((acc, row) => {
  let previosEndIndex = 0;
  for (let i = 0; i < 9; i++) {
    const startIndex = previosEndIndex;
    const endIndex = startIndex + 3;
    previosEndIndex = endIndex + 1;
    const value = row.slice(startIndex, endIndex);
    if (!acc[i]) {
      acc[i] = [];
    }
    if (value !== '   ') {
      acc[i].push(value.split('')[1]);
    }
  }

  return acc;
}, []);

const actions = rows.filter((row) => row.includes('move'));

actions.forEach((action) => {
  const value = action.split(' ');
  const howMuchToMove = parseInt(value[1], 10);
  const fromWhichToMove = parseInt(value[3], 10);
  const whereToMove = parseInt(value[5], 10);

  const itemsToMove = [];
  for (let i = 0; i < howMuchToMove; i++) {
    const fromTop = stacks[fromWhichToMove - 1].pop();

    itemsToMove.push(fromTop);
  }

  stacks[whereToMove - 1].push(...itemsToMove.reverse());
});

const result = stacks.map((stack) => stack[stack.length - 1]).join('');

console.log({ result });
