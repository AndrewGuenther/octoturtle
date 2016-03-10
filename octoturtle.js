/** @module octoturtle */

var Hook = require('./lib/hook.js');

/**
 * Builder function for a new {@link Hook}.
 * @param  {String} event The type of event this hook is responding to.
 * @return {Hook} A new {@link Hook}.
 */
function buildHook(event) {
  return new Hook(event);
}

/**
 * @borrows module:octoturtle~buildHook as whenAn
 * @borrows module:octoturtle~buildHook as whenA
 * @namespace octoturtle
 */
var octoturtle = {
  whenA: buildHook,
  whenAn: buildHook,

  /**
   * @see module:deploy/express
   */
  express: require('./deploy/express.js'),

  /**
   * @see Github
   */
  Github: require('./lib/github.js')
};

module.exports = octoturtle;
