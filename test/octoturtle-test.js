var Octoturtle = require('../octoturtle.js');
var Hook = require('../lib/hook.js');

describe('A rule-based system for reacting to Github activity', function() {
  it('provides a fluent interface', function() {
    var hook = Octoturtle.whenA();
    expect(hook instanceof Hook).toBe(true);
    expect(Octoturtle.whenA).toBe(Octoturtle.whenAn);
  });

  it('provides a set of convenience functions for interacting with Github',
      function() {
        expect(Octoturtle.Github).toBe(require('../lib/github.js'));
      });
});
