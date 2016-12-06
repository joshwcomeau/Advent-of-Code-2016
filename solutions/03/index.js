// Functional helpers. Used mainly for matrix multiplication.
const compose = (a, b) => (...args) => a(b(...args));
const get = id => array => array[id];
const map = (fn, array) => array.map(fn);
const pluck = (index, data) => map(get(index), data);
const rangeFrom = ({ length }) => [...Array(length).keys()];
const flatten = arr => [].concat.apply([], arr);
const flatMap = compose(flatten, map);


const getPairs = arr => {
  if (arr.length < 2) {
    return [];
  }

  const [head, ...tail] = arr;
  const pairs = tail.map(item => [head, item]);

  return [...pairs, ...getPairs(tail)];
}

const chunk = (arr, size) => {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

const rotateMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);

const validateTriangle = (...sides) => {
  if (sides.length !== 3) {
    return false;
  }

  const pairs = getPairs(sides);
  const perimeter = sides.reduce((sum, side) => sum + side, 0);

  // A triangle is valid if any two of its sides, summed, are larger than
  // the third. Check that every pair can sum to higher than the remaining side.
  return pairs.every(([a, b]) => {
    const lengthOfPair = a + b;
    const lengthOfThirdSide = perimeter - lengthOfPair;
    return lengthOfPair > lengthOfThirdSide;
  });
}

const getTrianglesFromColumns = (data) => {
  // Given data:
  // [
  //   [101 301 501],
  //   [102 302 502],
  //   [103 303 503],
  //   [201 401 601],
  //   [202 402 602],
  //   [203 403 603],
  // ]
  //
  // We need to return [101, 102, 103], [201, 202, 203], ...

  // Start by splitting the data into triplets.
  const tripletRows = chunk(data, 3);

  // Essentially what we have now is a 3x3 matrix. We need to rotate it,
  // so that we can use its columns instead of its rows.
  return flatMap(rotateMatrix, tripletRows);
}

const solve = (part) => {
  const input = require('./data');

  // The input comes in a weird format: triangles on a newline, each side
  // separated by 2 spaces.
  // Let's convert to an array of triangle arrays.
  let formattedInput = input.split('\n').map(triangle => (
    triangle.split(/\s\s/).map(Number).filter(n => !!n)
  ));

  // In part 2, we want to make triangles out of columns, not rows.
  if (part === 'part2') {
    formattedInput = getTrianglesFromColumns(formattedInput);

    console.log("Got formatted input", formattedInput.slice(formattedInput.length - 5))
  }

  return formattedInput.reduce((sum, triangle) => (
    validateTriangle(...triangle) ? sum + 1 : sum
  ), 0);
}





module.exports = {
  getPairs,
  chunk,
  validateTriangle,
  getTrianglesFromColumns,
  solve
};
