// Solution for Advent of Code, Day 7:
// http://adventofcode.com/2016/day/7


const isPalindrome = str => str === str.split('').reverse().join('');

const splitIP = ip => (
  ip.match(/([a-z]+)\[([a-z]+)\]([a-z]+)/).slice(1)
);

const groupSubstrings = (str, size, groups = [], index = 0) => {
  const newGroups = [...groups, str.substr(index, size)];

  const isAtEnd = str.length - index === size;

  if (isAtEnd) {
    return newGroups;
  }

  return groupSubstrings(str, size, newGroups, index + 1);
}

const isValidIP = ip => {
  const [start, middle, end] = splitIP(ip);

  return (
    !isPalindrome(middle) &&
    isPalindrome(start) ||
    isPalindrome(end)
  );
}

module.exports = {
  isPalindrome,
  splitIP,
  groupSubstrings,
  isValidIP,
}
