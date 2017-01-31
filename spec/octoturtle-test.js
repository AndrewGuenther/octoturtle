const octoturtle = require('../lib/octoturtle');
const Hook = require('../lib/hook');

const whenA = octoturtle;

describe('A rule-based system for reacting to Github activity', () => {
  it('provides a fluent interface', () => {
    const hook = whenA();
    expect(hook instanceof Hook).toBe(true);
  });
});
