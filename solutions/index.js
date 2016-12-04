const problem1 = require('./01');
const problem2 = require('./02');
const problem3 = require('./03');

const problems = { problem1, problem2, problem3 };


// Run the solution(s), if any, requested by the command line arguments.
const [node, filename, solve, problem, part] = process.argv;

// Ignore any times this file is called without proper command line arguments
if (solve !== 'solve') {
  return;
}


console.info(`--- Solving ${problem}, ${part}`);
const solution = problems[problem].solve(part);
console.info(`--- Solution: ${solution}`);
