const compose = (a, b) => (...args) => a(b(...args));
const get = id => array => array[id];
const map = (fn, array) => array.map(fn);
const pluck = (index, data) => map(get(index), data);
const rangeFrom = ({ length }) => [...Array(length).keys()];
const flatten = arr => [].concat.apply([], arr);
const flatMap = compose(flatten, map);


const rotateMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);


module.exports = {
  rotateMatrix,
};
