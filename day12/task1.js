const Graph = require('node-dijkstra');

const { splitTextToArray, readFile } = require('../shared.js');
const inputData = splitTextToArray(readFile('./day12/input.txt'));
const pointsMatrix = inputData.map((row) => row.split(''));
let start;
let finish;
const route = new Graph();

const isPossibleToGo = (fromPoint, toPoint) => {
  const compareLine = 'SabcdefghijklmnopqrstuvwxyzE';
  return compareLine.indexOf(toPoint) - compareLine.indexOf(fromPoint) <= 1;
};

const getPossibleNextPoints = (x, y, pointsMatrix) => {
  const currentPoint = pointsMatrix[x][y];
  const leftPoint = [x - 1, y];
  const rightPoint = [x + 1, y];
  const upPoint = [x, y + 1];
  const bottomPoint = [x, y - 1];

  return [leftPoint, rightPoint, upPoint, bottomPoint].filter(([nextPointX, nextPointY]) => {
    const nextPointValue = pointsMatrix[nextPointX]?.[nextPointY];
    if (!nextPointValue) {
      return false;
    }

    return isPossibleToGo(currentPoint, nextPointValue);
  });
};

const generateNodeKey = (x, y) => `${x};${y}`;

for (let i = 0; i < pointsMatrix.length; i++) {
  for (let j = 0; j < pointsMatrix[0].length; j++) {
    const currentPoint = pointsMatrix[i][j];
    const currentPointNodeKey = generateNodeKey(i, j);
    if (currentPoint === 'S') {
      start = currentPointNodeKey;
    }
    if (currentPoint === 'E') {
      finish = currentPointNodeKey;
    }

    const nextPointNodeKeys = getPossibleNextPoints(i, j, pointsMatrix).map(([x, y]) => generateNodeKey(x, y));
    const nodeNeighbors = nextPointNodeKeys.reduce((acc, neghbourNodeKey) => {
      acc[neghbourNodeKey] = 1;
      return acc;
    }, {});

    route.addNode(currentPointNodeKey, nodeNeighbors);
  }
}

console.log(route.path(start, finish).length - 1);
