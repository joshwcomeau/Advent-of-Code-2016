// sum the results of 2 arrays.
// eg. [1, 2] + [3, 4] = [4, 6]
const sumArrays = (arr1, arr2) => (
  arr1.map((element, index) => element + arr2[index])
);

const clamp = ({ min, max }) => num => (
  Math.max(min, Math.min(num, max))
);

const outOfBounds = (matrix, [x, y]) => {
  // For the purposes of this problem, we'll assume that the matrix is always
  // a square (equal length X and Y axes).
  const min = 0;
  const max = matrix.length - 1

  return (
    x < min || x > max ||
    y < min || y > max
  );
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
  code = '',
  currentPosition = [1, 1],
  instructions,
}) {
  const clamper = clamp({ min: 0, max: matrix.length - 1 });

  const direction = instructions[0];
  const offset = getCoordinateShiftForDirection(direction);

  const newPosition = sumArrays(currentPosition, offset);

  const isOutOfBounds = outOfBounds(matrix, newPosition)

  // Ignore any 'illegal' moves that fall outside the given matrix
  if (!isOutOfBounds) {
    const [x, y] = newPosition;
    const digit = matrix[x][y];

    code += digit;
  }

  // If that's the last of the instructions, we're done!
  const nextInstructions = instructions.substr(1);

  if (!nextInstructions) {
    return code;
  }

  return moveWithinMatrix({
    matrix,
    code,
    currentPosition: isOutOfBounds ? currentPosition : newPosition,
    instructions: nextInstructions,
  });
}


const solve = (part) => {
  const input = require('./data');
  const matrix = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ]

  return moveWithinMatrix({ matrix, instructions: input })
}


// Run the solution(s), if any, requested by the command line arguments.
const [node, filename, ...solutions] = process.argv;

solutions.forEach(solution => {
  console.log(`Solving for ${solution}:`, solve(solution));
});



module.exports = {
  sumArrays,
  clamp,
  getCoordinateShiftForDirection,
  outOfBounds,
  moveWithinMatrix,
};
