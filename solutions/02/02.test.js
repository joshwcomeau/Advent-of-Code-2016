const { expect } = require('chai');

const {
  sumArrays,
  clamp,
  getCoordinateShiftForDirection,
  outOfBounds,
  moveWithinMatrix,
} = require('./index.js');


describe('Problem 02', () => {
  describe('sumArrays', () => {
    it('sums values in the same positions', () => {
      const actualResult = sumArrays([1, 2], [3, 4]);
      const expectedResult = [4, 6];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('clamp', () => {
    it('clamps the minimum', () => {
      const actualResult = clamp({ min: 0, max: 2 })(-1);
      const expectedResult = 0;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('clamps the maximum', () => {
      const actualResult = clamp({ min: 0, max: 2 })(3);
      const expectedResult = 2;

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getCoordinateShiftForDirection', () => {
    it('handles UP', () => {
      const actualResult = getCoordinateShiftForDirection('U');
      const expectedResult = [-1, 0];

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('handles LEFT', () => {
      const actualResult = getCoordinateShiftForDirection('L');
      const expectedResult = [0, -1];

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('handles RIGHT', () => {
      const actualResult = getCoordinateShiftForDirection('R');
      const expectedResult = [0, 1];

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('handles DOWN', () => {
      const actualResult = getCoordinateShiftForDirection('D');
      const expectedResult = [1, 0];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('outOfBounds', () => {
    const matrix = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ];

    it('returns true if the X coordinate is too low', () => {
      const actualResult = outOfBounds(matrix, [-1, 1]);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true if the X coordinate is too high', () => {
      const actualResult = outOfBounds(matrix, [3, 1]);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true if the Y coordinate is too low', () => {
      const actualResult = outOfBounds(matrix, [1, -2]);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true if the Y coordinate is too high', () => {
      const actualResult = outOfBounds(matrix, [1, 5]);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false when both values are within the matrix', () => {
      const actualResult = outOfBounds(matrix, [1, 1]);
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });
  })

  describe('moveWithinMatrix', () => {
    const matrix = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ];

    const irregularMatrix = [
      [null, null, null, '1'],
      [null, null, '2',  '3'],
      [null, '4',  '5',  '6'],
      ['7',  '8',  '9',  '0'],
    ];

    it('handles a simple instruction', () => {
      const instructions = 'UL';

      const actualResult = moveWithinMatrix({ matrix, instructions });
      const expectedResult = '1';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles a slightly more complex instruction', () => {
      const instructions = 'ULDRRDLU';

      const actualResult = moveWithinMatrix({ matrix, instructions });
      const expectedResult = '5';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('clamps within the matrix', () => {
      const instructions = 'UUUUUL';

      const actualResult = moveWithinMatrix({ matrix, instructions });
      const expectedResult = '1';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles an irregular matrix', () => {
      const instructions = 'RU';

      const actualResult = moveWithinMatrix({
        matrix: irregularMatrix,
        currentPosition: [3, 0],
        instructions,
      });
      const expectedResult = '4';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('clamps within an irregular matrix', () => {
      const instructions = 'DLDLR';

      const actualResult = moveWithinMatrix({
        matrix: irregularMatrix,
        currentPosition: [3, 0],
        instructions,
      });
      const expectedResult = '8';

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
