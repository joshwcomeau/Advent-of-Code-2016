const problem1 = require('./01');
const problem2 = require('./02');
const problem3 = require('./03');
const problem4 = require('./04');
const problem5 = require('./05');
const problem6 = require('./06');

const problems = { problem1, problem2, problem3, problem4, problem5, problem6 };


// Run the solution(s), if any, requested by the command line arguments.
const [node, filename, solve, problem, part] = process.argv;

// Ignore any times this file is called without proper command line arguments
if (solve !== 'solve') {
  return;
}


console.info(`--- Solving ${problem}, ${part}`);
const solution = problems[problem].solve(part);
console.info(`--- Solution: ${solution}`);
