
const parseRoomListItem = roomListItem => {
  const listRegex = /([a-z\-]*)\-([0-9]*)\[([a-z]*)\]/;
  const [_, encryptedName, sector, checksum] = roomListItem.match(listRegex);

  return { encryptedName, sector, checksum };
};

const validateRoom = ({ encryptedName, checksum }) => {
  // The room is valid if the checksum contains the 5 most common letters,
  // sorted by the number of times the letter occurs, with ties sorted
  // alphabetically.
}

module.exports = {
  parseRoomListItem,
  validateRoom,
};
