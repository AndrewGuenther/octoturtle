var Hook = require('./lib/hook.js');

function buildHook(event) {
  return new Hook(event);
}

var octoturtle = {
  WhenA: buildHook,
  WhenAn: buildHook,
  Conditions: require('./lib/conditions.js'),
  Actions: require('./lib/actions.js'),
}

module.exports = octoturtle;
