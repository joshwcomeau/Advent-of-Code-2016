const { expect } = require('chai');

const {
  rotateMatrix,
} = require('./index');


describe.only('Problem 06', () => {
  describe('rotateMatrix', () => {
    it('pseudo-rotates the matrix clockwise', () => {
      const matrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
      ];

      const actualResult = rotateMatrix(matrix);
      const expectedResult = [
        [1,4,7],
        [2,5,8],
        [3,6,9],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
