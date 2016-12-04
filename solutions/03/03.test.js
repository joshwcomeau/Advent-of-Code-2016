const { expect } = require('chai');

const {
  getPairs,
  validateTriangle,
} = require('./index.js');


describe.only('Problem 03', () => {
  describe('getPairs', () => {
    it('returns all combinations of a 3-element array', () => {
      const actualResult = getPairs(['a', 'b', 'c']);
      const expectedResult = [['a', 'b'], ['a', 'c'], ['b', 'c']];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns all combinations of a 4-element array', () => {
      const actualResult = getPairs(['a', 'b', 'c', 'd']);
      const expectedResult = [
        ['a', 'b'], ['a', 'c'], ['a', 'd'],
        ['b', 'c'], ['b', 'd'],
        ['c', 'd'],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('validateTriangle', () => {
    it('returns false on a line', () => {
      const actualResult = validateTriangle(5, 10);
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false on a square', () => {
      const actualResult = validateTriangle(25, 25, 25, 25);
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false on a triangle with two short sides', () => {
      const actualResult = validateTriangle(5, 10, 25);
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false when the longest side is exactly equal', () => {
      const actualResult = validateTriangle(10, 20, 10);
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true on equilateral triangles', () => {
      const actualResult = validateTriangle(10, 10, 10);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true on right angle triangles', () => {
      const actualResult = validateTriangle(3, 4, 5);
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
