const { expect } = require('chai');

const {
  getPairs,
  chunk,
  validateTriangle,
  getTrianglesFromColumns,
} = require('./index.js');


describe('Problem 03', () => {
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

  describe('chunk', () => {
    it('splits a large group into smaller chunks', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

      const actualResult = chunk(arr, 3);
      const expectedResult = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    })
  })

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

  describe('getTrianglesFromColumns', () => {
    it('plucks 3 triangles from a 3x3 matrix', () => {
      const matrix = [
        [101, 201, 301],
        [102, 202, 302],
        [103, 203, 303],
      ];

      const actualResult = getTrianglesFromColumns(matrix);
      const expectedResult = [
        [101, 102, 103],
        [201, 202, 203],
        [301, 302, 303],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('plucks 6 triangles from a 3x6 matrix', () => {
      const matrix = [
        [101, 201, 301],
        [102, 202, 302],
        [103, 203, 303],
        [401, 501, 601],
        [402, 502, 602],
        [403, 503, 603],
      ];

      const actualResult = getTrianglesFromColumns(matrix);
      const expectedResult = [
        [101, 102, 103],
        [201, 202, 203],
        [301, 302, 303],
        [401, 402, 403],
        [501, 502, 503],
        [601, 602, 603],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
