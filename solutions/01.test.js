const { expect } = require('chai');

const {
  getHumanFriendlyDirection,
  formatInput,
  getOffsetForStep,
  turnInDirection,
  walk,
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

    it('handles multi-digit numbers', () => {
      const input = 'L14';

      const actualResult = formatInput(input);
      const expectedResult = [
        { direction: 'left', distance: 14 },
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

  describe('turnInDirection', () => {
    it('turns left while facing north', () => {
      const actualResult = turnInDirection({
        bearing: 'north',
        direction: 'left',
      });
      const expectedResult = 'west';

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('turns right while facing north', () => {
      const actualResult = turnInDirection({
        bearing: 'north',
        direction: 'right',
      });
      const expectedResult = 'east';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('turns left while facing west', () => {
      const actualResult = turnInDirection({
        bearing: 'west',
        direction: 'left',
      });
      const expectedResult = 'south';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('turns right while facing west', () => {
      const actualResult = turnInDirection({
        bearing: 'west',
        direction: 'right',
      });
      const expectedResult = 'north';

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('walk', () => {
    it('handles a single instruction', () => {
      const input = formatInput('R5');
      const actualResult = walk({ input });
      const expectedResult = { x: 5, y: 0, bearing: 'east' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles two instructions', () => {
      const input = formatInput('R5, L2');
      const actualResult = walk({ input });
      const expectedResult = { x: 5, y: -2, bearing: 'north' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles several instructions, and a non-default initial bearing', () => {
      const input = formatInput('L3, L3, L3, L4');
      const actualResult = walk({ input, initialBearing: 'west' });
      const expectedResult = { x: -1, y: 0, bearing: 'west' };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
