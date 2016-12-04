// sum the results of 2 arrays.
// eg. [1, 2] + [3, 4] = [4, 6]
const sumArrays = (arr1, arr2) => (
  arr1.map((element, index) => element + arr2[index])
);

function getCoordinateShiftForDirection(coords, direction) {
 switch (direction) {
   case 'U': return [-1, 0];
   case 'L': return [0, -1];
   case 'R': return [0, 1];
   case 'D': return [1, 0];
   default: throw new Error("Invalid direction provided");
 }
}




function moveWithinMatrix(matrix, currentPosition, direction) {
 const offset = getCoordinateShiftForDirection(currentPosition, direction);

 // TODO: Ensure that resulting value is positive / clamped to 0

 return sumArrays(currentPosition, offset);
}

module.exports = {
  sumArrays,
  getCoordinateShiftForDirection,
  moveWithinMatrix,
};
