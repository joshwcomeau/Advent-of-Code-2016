// Solution for Advent of Code, Day 2:
// http://adventofcode.com/2016/day/2

// sum the results of 2 arrays.
// eg. [1, 2] + [3, 4] = [4, 6]
const sumArrays = (arr1, arr2) => (
  arr1.map((element, index) => element + arr2[index])
);

const clamp = ({ min, max }) => num => (
  Math.max(min, Math.min(num, max))
);

const outOfBounds = (matrix, [x, y]) => {
  try {
    return !matrix[x][y];
  } catch (e) {
    return true;
  }
}

const getCoordinateShiftForDirection = direction => {
  switch (direction) {
    case 'U': return [-1, 0];
    case 'L': return [0, -1];
    case 'R': return [0, 1];
    case 'D': return [1, 0];
    default: throw new Error("Invalid direction provided");
  }
}

function moveWithinMatrix({
  matrix,
  currentPosition = [1, 1],
  instructions,
}) {
  const clamper = clamp({ min: 0, max: matrix.length - 1 });

  const direction = instructions[0];
  const offset = getCoordinateShiftForDirection(direction);

  const newPosition = sumArrays(currentPosition, offset);

  const isOutOfBounds = outOfBounds(matrix, newPosition)

  const nextInstructions = instructions.substr(1);

  // If that's the last of the instructions, we're done!
  if (!nextInstructions) {
    const [x, y] = newPosition;
    return matrix[clamper(x)][clamper(y)];
  }

  return moveWithinMatrix({
    matrix,
    currentPosition: isOutOfBounds ? currentPosition : newPosition,
    instructions: nextInstructions,
  });
}

function getCode({ matrix, instructions, startingPosition = [1, 1] }) {
  // Split each line of instructions into its own string
  const splitInstructions = instructions.split('\n');

  // Solve for each line, combine into a code
  return splitInstructions.reduce((code, instructions) => (
    code + moveWithinMatrix({
      matrix,
      instructions,
      currentPosition: startingPosition,
    })
  ), '');
}


const solve = (part) => {
  const input = require('./data');
  const matrix = part === 'part1' ? (
    [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]
  ) : (
    [
      [null, null, '1', null, null],
      [null, '2',  '3',  '4', null],
      ['5',  '6',  '7',  '8',  '9'],
      [null, 'A',  'B',  'C', null],
      [null, null, 'D', null, null],
    ]
  );

  return getCode({
    matrix,
    instructions: input,
    startingPosition: part === 'part1' ? [1, 1] : [2, 0],
  });
}

module.exports = {
  sumArrays,
  clamp,
  getCoordinateShiftForDirection,
  outOfBounds,
  moveWithinMatrix,
  solve,
};
