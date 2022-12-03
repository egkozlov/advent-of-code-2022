const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day1/input.txt');
let maxValue = 0;
let currentValue = 0;

const values = splitTextToArray(inputData);
values.forEach((value) => {
  if (value === '') {
    if (currentValue > maxValue) {
      maxValue = currentValue;
    }
    currentValue = 0;
  } else {
    const num = parseInt(value, 10);
    currentValue += num;
  }
});

console.log({ maxValue });
