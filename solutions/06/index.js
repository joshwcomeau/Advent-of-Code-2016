// Solution for Advent of Code, Day 6:
// http://adventofcode.com/2016/day/6
const defaultInput = require('./data');

// Functional helpers
const compose = (a, b) => (...args) => a(b(...args));
const get = id => array => array[id];
const map = (fn, array) => array.map(fn);
const pluck = (index, data) => map(get(index), data);
const rangeFrom = ({ length }) => [...Array(length).keys()];
const flatten = arr => [].concat.apply([], arr);
const values = obj => Object.keys(obj).map(k => obj[k]);
const max = arr => Math.max(...arr);
const maxValue = compose(max, values);
const flatMap = compose(flatten, map);


const formatInput = input => (
  input
    .split('\n')
    .map(line => line.split(''))
);

const rotateMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);

const getModeFromArray = array => {
  // Create a map where each element is assigned the value of how often it
  // occurs. eg:
  // ['a', 'b', 'b', 'c'] --> { a: 1, b: 2, c: 1 }
  const elementMap = array.reduce((map, elem) => (
    Object.assign({}, map, {
      [elem]: map[elem] ? map[elem] + 1 : 1
    })
  ), {});

  const maximumNumberOfOccurences = maxValue(elementMap);

  return Object.keys(elementMap).find(elem => (
    elementMap[elem] === maximumNumberOfOccurences
  ));
}

const solve = (part, input = defaultInput) => {
  const matrix = formatInput(input);

  return rotateMatrix(matrix)
    .map(getModeFromArray)
    .slice(0, matrix[0].length)
    .join('');
}


module.exports = {
  formatInput,
  rotateMatrix,
  getModeFromArray,
  solve,
};
