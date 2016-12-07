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

  return computedChecksum === providedChecksum;
};


// This function needs a better name. It both filters AND parses the input,
// meaning that data returned is in a different format from data provided.
// 'abc-de-f-123[abcde]'
//    -> { encryptedName: 'abc-de-f', sector: 123, checksum: 'abcde' }
const getValidRooms = (input) => {
  return input
    .split('\n')
    .map(parseRoomListItem)
    .filter(validateRoom);
};


const shift = (string, n) => {
  return string
    .split('')
    .map(char => {
      // Special case: dashes become spaces
      if (char === '-') {
        return ' ';
      }

      // We only deal with lowercase letters. Char codes range from 97 to 122.
      const charCode = char.charCodeAt();
      let newCharCode = charCode + (n % 26);
      if (newCharCode > 122) {
        newCharCode -= 26;
      }

      return String.fromCharCode(newCharCode);
    })
    .join('');
}


const solve = (part, input = sampleInput) => {
  const validRooms = getValidRooms(input);

  if (part === 'part1') {
    return validRooms.reduce((sum, { sector }) => sum + Number(sector), 0);
  }

  // For part 2, we need to decrypt!
  return validRooms.find(({ encryptedName, sector}) => {
    const decryptedName = shift(encryptedName, sector);
    return decryptedName === 'northpole object storage';
  }).sector;
};


module.exports = {
  parseRoomListItem,
  getLetterCounts,
  getChecksum,
  validateRoom,
  getValidRooms,
  shift,
  solve,
};
