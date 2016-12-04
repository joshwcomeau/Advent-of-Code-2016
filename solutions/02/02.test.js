const { expect } = require('chai');

const {
  sumArrays,
  getCoordinateShiftForDirection,
  moveWithinMatrix,
} = require('./index.js');


describe.only('Problem 02', () => {
  describe('sumArrays', () => {
    it('sums values in the same positions', () => {
      const actualResult = sumArrays([1, 2], [3, 4]);
      const expectedResult = [4, 6];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
