const { expect } = require('chai');

const {
  parseRoomListItem,
  validateRoom,
} = require('./index.js');


describe.only('Problem 04', () => {
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

  describe('validateRoom', () => {
    it('returns false if the checksum has the wrong letters', () => {
      const encryptedName = 'aaaaa-bbbb-ccc-dd-e';
      const checksum = 'vwxyz';

      const actualResult = validateRoom({ encryptedName, checksum })
      const expectedResult = false;

      expect(actualResult).to.deep.equal(expectedResult);
    })
  })
});
