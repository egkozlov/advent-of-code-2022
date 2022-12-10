const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day10/input.txt');
const commands = splitTextToArray(inputData);

const screenWidth = 40;
const screenHeight = 6;

const getValueToPrint = (cycle, currentRegister) => {
  const currentPosition = cycle % screenWidth;
  const isInsideSprite = currentPosition >= currentRegister - 1 && currentPosition <= currentRegister + 1;
  return isInsideSprite ? '#' : '.';
};

let cycle = 0;
let currentRegister = 1;

const output = commands.reduce((acc, command) => {
  if (command === 'noop') {
    acc.push(getValueToPrint(cycle, currentRegister));
    cycle += 1;
  } else {
    const valueToAdd = Number(command.split(' ')[1]);
    acc.push(getValueToPrint(cycle, currentRegister));
    cycle += 1;

    acc.push(getValueToPrint(cycle, currentRegister));
    cycle += 1;

    currentRegister += valueToAdd;
  }
  return acc;
}, []);

for (let i = 0; i < screenHeight; i++) {
  console.log(output.slice(i * screenWidth, i * screenWidth + screenWidth).join(''));
}
