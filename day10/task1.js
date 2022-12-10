const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day10/input.txt');
const commands = splitTextToArray(inputData);

let cycle = 0;
let currentRegister = 1;
const startPeriodicCycle = 20;
const cyclesFrequency = 40;

const isCycleToCalculateStrenght = (cycle) => (cycle - startPeriodicCycle) % cyclesFrequency === 0;

const strength = commands.reduce((acc, command) => {
  if (command === 'noop') {
    cycle += 1;
    if (isCycleToCalculateStrenght(cycle)) {
      acc += cycle * currentRegister;
    }
  } else {
    const valueToAdd = Number(command.split(' ')[1]);
    cycle += 1;
    if (isCycleToCalculateStrenght(cycle)) {
      acc += cycle * currentRegister;
    }

    cycle += 1;
    if (isCycleToCalculateStrenght(cycle)) {
      acc += cycle * currentRegister;
    }

    currentRegister += valueToAdd;
  }

  return acc;
}, 0);

// 13520
console.log({ strength });
