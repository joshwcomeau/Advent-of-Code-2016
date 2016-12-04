const getPairs = arr => {
  if (arr.length < 2) {
    return [];
  }

  const [head, ...tail] = arr;
  const pairs = tail.map(item => [head, item]);

  return [...pairs, ...getPairs(tail)];
}

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


const solve = (part) => {
  const input = require('./data');

  // The input comes in a weird format: triangles on a newline, each side
  // separated by 2 spaces.
  // Let's convert to an array of triangle arrays.
  const formattedInput = input.split('\n').map(triangle => (
    triangle.split(/\s\s/).map(Number)
  ));

  return formattedInput.reduce((sum, triangle) => (
    validateTriangle(...triangle) ? sum + 1 : sum
  ), 0);
}





module.exports = {
  getPairs,
  validateTriangle,
  solve
};
