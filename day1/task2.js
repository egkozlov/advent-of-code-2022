const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day1/input.txt');
let currentValue = 0;
const calloriesAmounts = [];
const rawCalloriesData = splitTextToArray(inputData);
rawCalloriesData.forEach((rawSnackCallorie) => {
  if (rawSnackCallorie === '') {
    calloriesAmounts.push(currentValue);
    currentValue = 0;
  } else {
    const snackCallories = parseInt(rawSnackCallorie, 10);
    currentValue += snackCallories;
  }
});
calloriesAmounts.sort((a, b) => b - a);
console.log(calloriesAmounts[0] + calloriesAmounts[1] + calloriesAmounts[2]);
