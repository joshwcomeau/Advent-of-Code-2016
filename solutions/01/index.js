// Solution for Advent of Code, Day 1:
// http://adventofcode.com/2016/day/1
//
// My approach is to transform the input into a sequence of single events.
// Either: turn left, turn right, or move by 1 block in the current direction
// (respectively 'left', 'right', and 'straight').
//
// At every step, we track the position visited, as it may be our destination.
// Logic for determining whether the current position is the destination
// depends on the part of the problem we'd like to solve, represented by the
// boolean `returnOnDuplicatePosition`.
//
// Rather than try to create the most efficient solution, my goal for this
// task is to create a human-friendly, easily extensible solution.

const defaultInput = require('./data');

const flatten = arr => [].concat.apply([], arr);
const map = (arr, fn) => arr.map(fn);
const compose = (a, b) => (...x) => a(b(...x));
const flatMap = compose(flatten, map);

const removeWhitespace = str => str.replace(/\s/g, '');
const fillArray = (str, n) => Array(Number(n)).fill(str)


const getHumanFriendlyDirection = dir => {
  switch (dir) {
    case 'L': return 'left';
    case 'R': return 'right';
    default:
      throw new Error('Unrecognized input to `getHumanFriendlyDirection`');
  }
}

// Our input is provided in a comma-separated list of turn/distance pairs.
// eg. 'R1, L2, L3, L1'.
//
// To make our life simpler, let's convert this to an array of single steps.
// eg. ['right', 'straight', 'left', 'straight', 'straight', 'left', ...]
//
// This way, every 'event' is its own step in a walk. Turning and moving
// straight are tackled independently.
const formatInput = (input) => {
  const inputArray = removeWhitespace(input).split(',');

  return flatMap(inputArray, inputEntry => {
    const [direction, distance] = [inputEntry[0], inputEntry.substr(1)];
    const distanceSteps = fillArray('straight', distance);

    return [
      getHumanFriendlyDirection(direction),
      ...distanceSteps,
    ];
  })
};

const turnInDirection = ({ bearing, direction }) => {
  const clockwiseBearings = ['north', 'east', 'south', 'west'];
  const currentBearingIndex = clockwiseBearings.indexOf(bearing);

  // If we're turning right, we'll shift up by 1 position.
  // If we're turning left, shift down by 1 position (which is equivalent,
  // with a circular n-item array, to shifting up n-1 places)
  const offset = direction === 'right' ? 1 : (clockwiseBearings.length - 1);

  const newBearingIndex = (currentBearingIndex + offset) % 4;

  return clockwiseBearings[newBearingIndex];
}

const getOffsetForBearing = bearing => {
  switch (bearing) {
    case 'north': return { x: 0, y: -1 };
    case 'south': return { x: 0, y: 1 };
    case 'west': return { x: -1, y: 0 };
    case 'east': return { x: 1, y: 0 };
  }
}

// Simple helper to get primary/secondary axis.
const getAxes = ({ x, y }) => x === 0 ? ['y', 'x'] : ['x', 'y'];


// A step is a single event in a walk.
// It can either be a move of 1 position in the current direction,
// or a 90-degree turn (with 0 distance actually covered).
const step = ({ position, instruction }) => {
  const { bearing } = position;

  if (instruction === 'straight') {
    const offset = getOffsetForBearing(bearing);

    const newPosition = Object.assign({}, position, {
      x: position.x + offset.x,
      y: position.y + offset.y,
    });

    return newPosition;
  } else {
    const newBearing = turnInDirection({
      bearing,
      direction: instruction,
    });

    return Object.assign({}, position, { bearing: newBearing });
  }
}

function walk({
  instructions,
  position = { x: 0, y: 0, bearing: 'north' },
  history = {},
  returnOnDuplicatePosition = false,
}) {
  const [instruction, ...restOfInstructions] = instructions;

  const newPosition = step({ position, instruction });

  // If this is the end of the instructions, this last position is our final one
  const endOfInstructions = restOfInstructions.length === 0;
  if (endOfInstructions) {
    return newPosition;
  }

  // If this recent step wasn't a 'turn' step, and we're in return-on-duplicate
  // mode, we want to do our history checking and storing stuff.
  if (instruction === 'straight' && returnOnDuplicatePosition) {
    const positionKey = `${newPosition.x}-${newPosition.y}`;

    const alreadyVisited = !!history[positionKey] && returnOnDuplicatePosition;

    if (alreadyVisited) {
      return newPosition;
    }

    history = Object.assign({}, history, { [positionKey]: true });
  }

  return walk({
    instructions: restOfInstructions,
    position: newPosition,
    history,
    returnOnDuplicatePosition,
  });
}


const solve = (part, input = defaultInput) => {
  const { x, y } = walk({
    instructions: formatInput(input),
    returnOnDuplicatePosition: part === 'part2',
  });

  return Math.abs(x) + Math.abs(y);
}


module.exports = {
  getHumanFriendlyDirection,
  formatInput,
  getAxes,
  turnInDirection,
  walk,
  step,
  solve
};
