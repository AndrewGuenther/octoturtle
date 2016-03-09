var Hook = require('./lib/hook.js');

function buildHook(event) {
  return new Hook(event);
}

module.exports = {
  WhenA: buildHook,
  WhenAn: buildHook,
  Github: require('./lib/github.js')
}
