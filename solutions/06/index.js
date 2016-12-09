// Solution for Advent of Code, Day 6:
// http://adventofcode.com/2016/day/6
const defaultInput = require('./data');

// Functional helpers
const compose = (a, b) => (...args) => a(b(...args));
const get = id => array => array[id];
const map = (fn, array) => array.map(fn);
const pluck = (index, data) => map(get(index), data);
const rangeFrom = ({ length }) => [...Array(length).keys()];
const values = obj => Object.keys(obj).map(k => obj[k]);
const max = arr => Math.max(...arr);
const min = arr => Math.min(...arr);
const maxValue = compose(max, values);
const minValue = compose(min, values);
const findKey = (obj, key) => Object.keys(obj).find(e => obj[e] === key);


// Convert our string input into a matrix
const formatInput = input => (
  input
    .split('\n')
    .map(line => line.split(''))
);


const rotateMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);


const getElementMap = array => {
  // Create a map tracking the occurences of each element. eg:
  // ['a', 'b', 'b', 'c'] --> { a: 1, b: 2, c: 1 }
  return array.reduce((map, elem) => (
    Object.assign({}, map, {
      [elem]: map[elem] ? map[elem] + 1 : 1
    })
  ), {});
}


const getModeFromArray = array => {
  const elementMap = getElementMap(array);
  return findKey(elementMap, maxValue(elementMap));
}


const getAntiModeFromArray = array => {
  const elementMap = getElementMap(array);
  return findKey(elementMap, minValue(elementMap));
}


const solve = (part, input = defaultInput) => {
  const matrix = formatInput(input);

  return rotateMatrix(matrix)
    .map(part === 'part1' ? getModeFromArray : getAntiModeFromArray)
    .slice(0, matrix[0].length)
    .join('');
}


module.exports = {
  formatInput,
  rotateMatrix,
  getElementMap,
  getModeFromArray,
  solve,
};
