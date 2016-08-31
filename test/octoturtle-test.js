var octoturtle = require('../octoturtle.js');
var whenA = octoturtle;
var Hook = require('../lib/hook.js');

describe('A rule-based system for reacting to Github activity', function() {
  it('provides a fluent interface', function() {
    var hook = whenA();
    expect(hook instanceof Hook).toBe(true);
  });

  it('provides a set of convenience functions for interacting with Github',
      function() {
        expect(octoturtle.Github).toBe(require('../lib/github.js'));
      });
});
