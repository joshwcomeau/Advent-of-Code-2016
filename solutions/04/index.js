// Solution for Advent of Code, Day 4:
// http://adventofcode.com/2016/day/4
const sampleInput = require('./data');


const parseRoomListItem = roomListItem => {
  const listRegex = /([a-z\-]*)\-([0-9]*)\[([a-z]*)\]/;
  const [_, encryptedName, sector, checksum] = roomListItem.match(listRegex);

  return { encryptedName, sector, checksum };
};


const getLetterCounts = string => (
  string.replace(/\-/g, '').split('').reduce((acc, letter) => (
    Object.assign({}, acc, {
      [letter]: acc[letter] ? acc[letter] + 1 : 1,
    })
  ), {})
);


const getChecksum = counts => (
  Object.keys(counts)
    .sort((a, b) => (
      // Default to getting the difference, but if the two counts are the same,
      // fall back to using alphabetical order
      counts[b] - counts[a] || a.localeCompare(b)
    ))
    .slice(0, 5)
    .join('')
);


const validateRoom = ({ encryptedName, checksum: providedChecksum }) => {
  // The room is valid if the checksum contains the 5 most common letters,
  // sorted by the number of times the letter occurs, with ties sorted
  // alphabetically.
  const counts = getLetterCounts(encryptedName);
  const computedChecksum = getChecksum(counts);

  console.log({encryptedName, computedChecksum, providedChecksum }, computedChecksum === providedChecksum)

  return computedChecksum === providedChecksum;
};


const getValidRoomSectors = (input) => {
  const roomList = input.split('\n');

  return roomList.reduce((sectors, roomListItem) => {
    const parsedItem = parseRoomListItem(roomListItem);

    return validateRoom(parsedItem)
      ? [...sectors, parsedItem.sector]
      : sectors;
  }, []);
};


const solve = (part, input = sampleInput) => {
  return getValidRoomSectors(input).reduce((sum, sector) => {
    return sum + Number(sector)
  }, 0);
};


module.exports = {
  parseRoomListItem,
  getLetterCounts,
  getChecksum,
  validateRoom,
  getValidRoomSectors,
  solve,
};
