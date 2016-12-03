const { expect } = require('chai');

const {
  getHumanFriendlyDirection,
  formatInput,
  getOffsetForStep,
} = require('./01.js');


describe('Problem 01', () => {
  describe('getHumanFriendlyDirection', () => {
    it('handles `R`', () => {
      expect(getHumanFriendlyDirection('R')).to.equal('right');
    });

    it('handles `L`', () => {
      expect(getHumanFriendlyDirection('L')).to.equal('left');
    });

    it('throws on other values', () => {
      expect(getHumanFriendlyDirection.bind('Merry Christmas!')).to.throw();
    });
  });

  describe('formatInput', () => {
    it('parses a single instruction', () => {
      const input = 'L4';

      const actualResult = formatInput(input);
      const expectedResult = [
        { direction: 'left', distance: 4 },
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('parses a complex set of instructions', () => {
      const input = 'R4, R2, L1, R5';

      const actualResult = formatInput(input);
      const expectedResult = [
        { direction: 'right', distance: 4 },
        { direction: 'right', distance: 2 },
        { direction: 'left', distance: 1 },
        { direction: 'right', distance: 5 },
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getOffsetForStep', () => {
    it('handles `north` and `left`', () => {
      const actualResult = getOffsetForStep({
        bearing: 'north',
        direction: 'left',
      });

      const expectedResult = { x: -1, y: 0 };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles `west` and `right`', () => {
      const actualResult = getOffsetForStep({
        bearing: 'west',
        direction: 'right',
      });

      const expectedResult = { x: 0, y: -1 };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles `south` and `right`', () => {
      const actualResult = getOffsetForStep({
        bearing: 'south',
        direction: 'right',
      });

      const expectedResult = { x: -1, y: 0 };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});