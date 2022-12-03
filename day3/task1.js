const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day3/input.txt');

const rucksacks = splitTextToArray(inputData);
const alphaBetWeight = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const calculateItemPriority = (item) => alphaBetWeight.indexOf(item) + 1;
const rucksackToCompartmentsMapper = (rucksack) => {
  const length = rucksack.length;
  const rucksackItems = rucksack.split('');
  const firstCompartmentItems = rucksackItems.slice(0, length / 2);
  const secondCompartmentItems = rucksackItems.slice(length / 2);
  return [firstCompartmentItems, secondCompartmentItems];
};

const compartmentsToCommonItemMapper = ([firstCompartmentItems, secondCompartmentItems]) =>
  firstCompartmentItems.find((item) => secondCompartmentItems.some((itemToCompare) => itemToCompare === item));

const commonItemsPrioritiesSum = rucksacks
  .map(rucksackToCompartmentsMapper)
  .map(compartmentsToCommonItemMapper)
  .reduce((sum, item) => sum + calculateItemPriority(item), 0);

console.log({ commonItemsPrioritiesSum });
