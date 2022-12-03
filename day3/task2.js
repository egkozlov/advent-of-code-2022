const { splitTextToArray, readFile } = require('../shared.js');
const inputData = readFile('./day3/input.txt');

const rucksacks = splitTextToArray(inputData);
const alphaBetWeight = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const calculateItemPriority = (item) => alphaBetWeight.indexOf(item) + 1;
const groupRucksacks = (rucksacks) =>
  rucksacks.reduce((acc, item) => {
    const lastGroup = acc.at(-1);
    if (!lastGroup || lastGroup.length === 3) {
      acc.push([item.split('')]);
    } else {
      lastGroup.push(item.split(''));
    }

    return acc;
  }, []);

const groupToCommonItemMapper = ([firstRucksackItems, secondRucksackItems, thirdRucksackItems]) =>
  firstRucksackItems.find(
    (item) => secondRucksackItems.some((itemToCompare) => itemToCompare === item) && thirdRucksackItems.some((itemToCompare) => itemToCompare === item)
  );

const commonItemsPrioritiesSum = groupRucksacks(rucksacks)
  .map(groupToCommonItemMapper)
  .reduce((sum, item) => sum + calculateItemPriority(item), 0);

// right answer 2515
console.log({ commonItemsPrioritiesSum });
