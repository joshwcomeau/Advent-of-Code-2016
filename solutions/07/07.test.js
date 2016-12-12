const { expect } = require('chai');

const {
  isPalindrome,
  splitIP,
  groupSubstrings,
  isValidIP,
} = require('./index');

describe.only('Problem 07', () => {
  describe('isPalindrome', () => {
    it('detects palindromes', () => {
      const actualResult = isPalindrome('racecar');
      const expectedResult = true;

      expect(actualResult).to.equal(expectedResult);
    });

    it('returns false on non-palindromes', () => {
      const actualResult = isPalindrome('eraser');
      const expectedResult = false;

      expect(actualResult).to.equal(expectedResult);
    });
  });

  describe('splitIP', () => {
    it('splits into 3 groups', () => {
      const ip = 'abcd[efgh]ijkl';

      const actualResult = splitIP(ip);
      const expectedResult = ['abcd', 'efgh', 'ijkl'];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('groupSubstrings', () => {
    it('splits into a single group when length matches num', () => {
      const actualResult = groupSubstrings('hello', 5);
      const expectedResult = ['hello'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('splits into 2 groups when the number is 1 below', () => {
      const actualResult = groupSubstrings('hello', 4);
      const expectedResult = ['hell', 'ello'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns individual characters with a group size of 1', () => {
      const actualResult = groupSubstrings('hello', 1);
      const expectedResult = ['h', 'e', 'l', 'l', 'o'];

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns several groups', () => {
      const actualResult = groupSubstrings('good day', 3);
      const expectedResult = ['goo', 'ood', 'od ', 'd d', ' da', 'day'];

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  describe('isValidIP', () => {
    it('is valid when the first group is a palindrome', () => {
      const ip = 'abba[hello]wxyz';

      const actualResult = isValidIP(ip);
      const expectedResult = true;

      expect(actualResult).to.equal(expectedResult);
    });

    it('is valid when the last group is a palindrome', () => {
      const ip = 'abcd[hello]wxxw';

      const actualResult = isValidIP(ip);
      const expectedResult = true;

      expect(actualResult).to.equal(expectedResult);
    });

    it('is invalid when the middle group is a palindrome', () => {
      const ip = 'abcd[effe]wxyz';

      const actualResult = isValidIP(ip);
      const expectedResult = false;

      expect(actualResult).to.equal(expectedResult);
    });

    it('is invalid when the first group is a palindrome, but so is the middle', () => {
      const ip = 'abba[dccd]wxyz';

      const actualResult = isValidIP(ip);
      const expectedResult = false;

      expect(actualResult).to.equal(expectedResult);
    });

    it('is valid when the first group contains a palindrome', () => {
      const ip = 'helloracecar[dccd]wxyz';

      const actualResult = isValidIP(ip);
      const expectedResult = false;

      expect(actualResult).to.equal(expectedResult);
    });
  })
});
