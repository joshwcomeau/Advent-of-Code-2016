/*
Santa's sleigh uses a very high-precision clock to guide its movements, and the
clock's oscillator is regulated by stars. Unfortunately, the stars have been
stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve
all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each
day in the advent calendar; the second puzzle is unlocked when you complete the
first. Each puzzle grants one star. Good luck!

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near",
unfortunately, is as close as you can get - the instructions on the Easter
Bunny Recruiting Document the Elves intercepted start here, and nobody had time
to work them out further.

The Document indicates that you should start at the given coordinates (where
you just landed) and face North. Then, follow the provided sequence: either
turn left (L) or right (R) 90 degrees, then walk forward the given number of
blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you
take a moment and work out the destination. Given that you can only walk on the
street grid of the city, how far is the shortest path to the destination?

For example:

Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is
2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.
How many blocks away is Easter Bunny HQ?
*/

const inputString = 'L4, L3, R1, L4, R2, R2, L1, L2, R1, R1, L3, R5, L2, R5, L4, L3, R2, R2, L5, L1, R4, L1, R3, L3, R5, R2, L5, R2, R1, R1, L5, R1, L3, L2, L5, R4, R4, L2, L1, L1, R1, R1, L185, R4, L1, L1, R5, R1, L1, L3, L2, L1, R2, R2, R2, L1, L1, R4, R5, R53, L1, R1, R78, R3, R4, L1, R5, L1, L4, R3, R3, L3, L3, R191, R4, R1, L4, L1, R3, L1, L2, R3, R2, R4, R5, R5, L3, L5, R2, R3, L1, L1, L3, R1, R4, R1, R3, R4, R4, R4, R5, R2, L5, R1, R2, R5, L3, L4, R1, L5, R1, L4, L3, R5, R5, L3, L4, L4, R2, R2, L5, R3, R1, R2, R5, L5, L3, R4, L5, R5, L3, R1, L1, R4, R4, L3, R2, R5, R1, R2, L1, R4, R1, L3, L3, L5, R2, R5, L1, L4, R3, R3, L3, R2, L5, R1, R3, L3, R2, L1, R4, R3, L4, R5, L2, L2, R5, R1, R2, L4, L4, L5, R3, L4';


/** getHumanFriendlyDirection
  Simple utility that transforms a direction into something human-readable

  @param dir {string} - enum of 'L', 'R'
  @returns {string} - either 'left' or 'right'
 */
const getHumanFriendlyDirection = dir => {
  switch (dir) {
    case 'L': return 'left';
    case 'R': return 'right';
    default:
      throw new Error('Unrecognized input to `getHumanFriendlyDirection`');
  }
}

/** formatInput
  Takes the arcane gibberish input provided and turns it into something workable.
  Yes, the formatted input is much much less efficient.
  I'm optimizing for humans, though, not for computers :)

  @param input {string} - the big set of comma-separated instructions

  @returns {[object]} an array of objects, each describing the direction and
  distance traveled by that step.

  @example formatInput('R1, L3') --> [
    { direction: 'right', distance: 1 },
    { direction: 'left', distance: 3 },
  ]
 */
const formatInput = input => (
  input
    .split(', ')
    .map(step => {
      const [dir, distance] = step.split('');

      return {
        direction: getHumanFriendlyDirection(dir),
        distance: parseInt(distance),
      };
    })
);

/** getOffsetForStep
  Calculates the impact of a given step on the X and Y axes

  @param bearing {string} - enum of 'north', 'south', 'east', 'west'
  @param direction {string} - enum of 'L', 'R'

  @returns {object} an object providing multiplicands for X/Y axes. eg. { x: 1, y: 0 }

  @example getOffsetForStep('north', 'L') --> { x: -1, y: 0 }
  @example getOffsetForStep('east', 'R') --> { x: 0, y: 1 }
 */
const getOffsetForStep = ({ bearing, direction }) => {
  switch (bearing) {
    case 'north': return { x: direction === 'left' ? -1 : 1, y: 0 };
    case 'south': return { x: direction === 'left' ? 1 : -1 , y: 0 };
    case 'east': return { x: 0, y: direction === 'left' ? -1 : 1 };
    case 'west': return { x: 0, y: direction === 'left' ? 1 : -1 };


  }
}

function walk(bearing, steps) {

}

module.exports = {
  getHumanFriendlyDirection,
  formatInput,
  getOffsetForStep,
};
