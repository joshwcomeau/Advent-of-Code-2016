const { expect } = require('chai');

const {
  getHumanFriendlyDirection,
  formatInput,
  getMultiplicandForStep,
  getAxes,
  turnInDirection,
  step,
  walk,
} = require('./index.js');


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
        'left', 'straight', 'straight', 'straight', 'straight',
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles multi-digit numbers', () => {
      const input = 'L14';

      const actualResult = formatInput(input);
      const expectedResult = [
        'left',
        'straight', 'straight', 'straight', 'straight', 'straight',
        'straight', 'straight', 'straight', 'straight', 'straight',
        'straight','straight', 'straight', 'straight',
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('parses a complex set of instructions', () => {
      const input = 'R4, R2, L1, R5';

      const actualResult = formatInput(input);
      const expectedResult = [
        'right', 'straight', 'straight', 'straight', 'straight',
        'right', 'straight', 'straight',
        'left', 'straight',
        'right', 'straight', 'straight', 'straight', 'straight', 'straight',
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getAxes', () => {
    it('gets the X axis with a positive value', () => {
      const actualResult = getAxes({
        x: 1,
        y: 0,
      });
      const expectedResult = ['x', 'y'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('gets the X axis with a negative value', () => {
      const actualResult = getAxes({
        x: -1,
        y: 0,
      });
      const expectedResult = ['x', 'y'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('gets the Y axis with a positive value', () => {
      const actualResult = getAxes({
        x: 0,
        y: 1,
      });
      const expectedResult = ['y', 'x'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('gets the Y axis with a negative value', () => {
      const actualResult = getAxes({
        x: 0,
        y: -1,
      });
      const expectedResult = ['y', 'x'];

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

  describe('step', () => {
    it('handles going straight', () => {
      const position = { x: 0, y: 0, bearing: 'north' };
      const instruction = 'straight';

      const actualResult = step({ position, instruction });
      const expectedResult = { x: 0, y: -1, bearing: 'north' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles a right turn', () => {
      const position = { x: 0, y: 0, bearing: 'north' };
      const instruction = 'right';

      const actualResult = step({ position, instruction });
      const expectedResult = { x: 0, y: 0, bearing: 'east' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles a left turn', () => {
      const position = { x: 0, y: 0, bearing: 'west' };
      const instruction = 'left';

      const actualResult = step({ position, instruction });
      const expectedResult = { x: 0, y: 0, bearing: 'south' };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('walk', () => {
    it('handles a single instruction', () => {
      const instructions = formatInput('R5');
      const actualResult = walk({ instructions });
      const expectedResult = { x: 5, y: 0, bearing: 'east' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles two instructions', () => {
      const instructions = formatInput('R5, L2');
      const actualResult = walk({ instructions });
      const expectedResult = { x: 5, y: -2, bearing: 'north' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles several instructions, and a non-default initial bearing', () => {
      const instructions = formatInput('L3, L3, L3, L4');
      const actualResult = walk({
        instructions,
        position: {
          x: 0,
          y: 0,
          bearing: 'west',
        },
      });
      const expectedResult = { x: -1, y: 0, bearing: 'west' };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles returning on duplicate position', () => {
      //     /-\
      //    |  |
      // O--+--/      <-- should return on the +, not the x
      //    |
      //     \-x
      const instructions = formatInput('R5, L2, L2, L5, L3');
      const actualResult = walk({ instructions, returnOnDuplicatePosition: true });
      const expectedResult = { x: 3, y: 0, bearing: 'south' };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
