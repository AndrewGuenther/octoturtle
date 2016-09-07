const octoturtle = require('../lib/octoturtle');
const Hook = require('../lib/hook');
const Github = require('../lib/github');

const whenA = octoturtle;

describe('A rule-based system for reacting to Github activity', () => {
  it('provides a fluent interface', () => {
    const hook = whenA();
    expect(hook instanceof Hook).toBe(true);
  });

  it('provides a set of convenience functions for interacting with Github', () => {
    expect(octoturtle.Github).toBe(Github);
  });
});
