const { expect } = require('chai');

const {
  formatInput,
  rotateMatrix,
  getElementMap,
  getModeFromArray,
  solve,
} = require('./index');


describe('Problem 06', () => {
  describe('formatInput', () => {
    it('splits into a matrix', () => {
      const input = `abc\ndef\nghi`;

      const actualResult = formatInput(input);
      const expectedResult = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

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

  describe('getElementMap', () => {
    it('builds a map of elements by occurence', () => {
      const arr = ['a', 'b', 'b', 'c', 'd', 'e'];

      const actualResult = getElementMap(arr);
      const expectedResult = {
        a: 1,
        b: 2,
        c: 1,
        d: 1,
        e: 1,
      };

      expect(actualResult).to.deep.equal(expectedResult);
    })
  });

  describe('getModeFromArray', () => {
    it('finds the most prevalent element', () => {
      const arr = ['a', 'b', 'b', 'c', 'd', 'e'];

      const actualResult = getModeFromArray(arr);
      const expectedResult = 'b';

      expect(actualResult).to.equal(expectedResult);
    });

    it('returns the first match in the event of a tie', () => {
      const arr = ['z', 'y', 'x', 'y', 'x'];

      const actualResult = getModeFromArray(arr);
      const expectedResult = 'y';

      expect(actualResult).to.equal(expectedResult);
    });
  });

  describe('solve', () => {
    it('solves part 1', () => {
      const input = `ealao\nhelba\nh2lco\nivll2\noello`;

      const actualResult = solve('part1', input);
      const expectedResult = 'hello';

      expect(actualResult).to.equal(expectedResult);
    });

    it('solves part 2', () => {
      const input = `bzr\nayr\naze`;

      const actualResult = solve('part2', input);
      const expectedResult = 'bye';

      expect(actualResult).to.equal(expectedResult);
    })

    it('ignores additional rows for rectangular matrices', () => {
      const input = `ealao\nhelba\nh2lco\nivll2\noello\nhello\nhello`;

      const actualResult = solve('part1', input);
      const expectedResult = 'hello';

      expect(actualResult).to.equal(expectedResult);
    });
  });
});
