var Hook = require('./lib/hook.js');

function buildHook(event) {
  return new Hook(event);
}

module.exports = {
  whenA: buildHook,
  whenAn: buildHook,
  github: require('./lib/github.js'),
  express: require('./deploy/express.js')
};
