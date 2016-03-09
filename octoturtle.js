var Hook = require('./lib/hook.js');

function buildHook(event) {
  return new Hook(event);
}

module.exports = {
  WhenA: buildHook,
  WhenAn: buildHook,
  github: require('./lib/github.js'),
  express: require('./deploy/express.js')
}
