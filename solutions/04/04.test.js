const { expect } = require('chai');

const {
  parseRoomListItem,
  getLetterCounts,
  getChecksum,
  validateRoom,
  getValidRooms,
  shift,
  solve
} = require('./index.js');


describe('Problem 04', () => {
  describe('parseRoomListItem', () => {
    it('returns the encrypted name, sector, and checksum', () => {
      const listItem = 'aaaaa-bbb-z-y-x-123[abxyz]';

      const actualResult = parseRoomListItem(listItem)
      const expectedResult = {
        encryptedName: 'aaaaa-bbb-z-y-x',
        sector: '123',
        checksum: 'abxyz',
      };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getLetterCounts', () => {
    it('counts the letters in a string', () => {
      const actualResult = getLetterCounts('aaaaabbbbcccdde');
      const expectedResult = {
        a: 5,
        b: 4,
        c: 3,
        d: 2,
        e: 1,
      };

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getChecksum', () => {
    it('returns the letters in order of frequency', () => {
      const count = {
        a: 5,
        b: 4,
        c: 3,
        d: 2,
        e: 1,
      };

      const actualResult = getChecksum(count);
      const expectedResult = 'abcde';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('trims it to 5 characters', () => {
      const count = {
        a: 5,
        b: 2,
        c: 4,
        d: 3,
        e: 1,
        f: 0,
        g: 6,
        h: 7
      };

      const actualResult = getChecksum(count);
      const expectedResult = 'hgacd';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('resolves ties alphabetically', () => {
      const count = {
        g: 7,
        e: 7,
        a: 7,
        b: 2,
        c: 7,
        d: 3,
        f: 0,
        h: 6
      };

      const actualResult = getChecksum(count);
      const expectedResult = 'acegh';

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  // Given that checksum validation is mostly covered by other tests,
  // we won't test validateRoom too heavily.
  describe('validateRoom', () => {
    it('returns false if the checksum has the wrong letters', () => {
      const encryptedName = 'aaaaa-bbbb-ccc-dd-e';
      const checksum = 'vwxyz';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false if the checksum has the letters in the wrong order', () => {
      const encryptedName = 'aaaaa-bbbb-ccc-dd-e';
      const checksum = 'edcba';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns false if the checksum has too many letters', () => {
      const encryptedName = 'aaaaa-bbbb-ccc-dd-e';
      const checksum = 'abcdef';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns true if the checksum matches', () => {
      const encryptedName = 'aaaaa-bbbb-ccc-dd-e';
      const checksum = 'abcde';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles sample data ABXYZ', () => {
      const encryptedName = 'aaaaa-bbb-z-y-x';
      const checksum = 'abxyz';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles sample data ABCDE', () => {
      const encryptedName = 'a-b-c-d-e-f-g-h';
      const checksum = 'abcde';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('handles sample data OAREL', () => {
      const encryptedName = 'not-a-real-room';
      const checksum = 'oarel';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = true;

      expect(actualResult).to.deep.equal(expectedResult);
    });
    it('handles sample data DECOY', () => {
      const encryptedName = 'totally-real-room';
      const checksum = 'decoy';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('getValidRooms', () => {
    it('returns an parsed set of valid rooms', () => {
      const roomList = [
        'abcde-abcd-abc-ab-a-123[abcde]',
        'not-a-valid-room-456[abcde]',
        'v-www-xxxx-yy-zzzzz-789[zxwyv]',
      ].join('\n');

      const actualResult = getValidRooms(roomList)
      const expectedResult = [
        {
          checksum: "abcde",
          encryptedName: "abcde-abcd-abc-ab-a",
          sector: "123",
        },
        {
          checksum: "zxwyv",
          encryptedName: "v-www-xxxx-yy-zzzzz",
          sector: "789",
        },
      ];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('shift', () => {
    it('shifts a string by 4 characters', () => {
      const string = 'josh';

      const actualResult = shift(string, 4);
      const expectedResult = 'nswl';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles letters that "wrap around"', () => {
      const string = 'wow';

      const actualResult = shift(string, 5);
      const expectedResult = 'btb';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('handles shifts of more than 26 letters', () => {
      const string = 'wow';

      const actualResult = shift(string, 31);
      const expectedResult = 'btb';

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('converts dashes to spaces', () => {
      const string = 'hi-five';

      const actualResult = shift(string, 31);
      const expectedResult = 'mn knaj';

      expect(actualResult).to.deep.equal(expectedResult);
    })
  });

  describe('solve', () => {
    context('part 1', () => {
      it('gets the right answer for the sample data', () => {
        const roomList = [
          'aaaaa-bbb-z-y-x-123[abxyz]',
          'a-b-c-d-e-f-g-h-987[abcde]',
          'not-a-real-room-404[oarel]',
          'totally-real-room-200[decoy]',
        ].join('\n');

        const actualResult = solve('part1', roomList)
        const expectedResult = 1514;

        expect(actualResult).to.deep.equal(expectedResult);
      });
    });
  });
});
