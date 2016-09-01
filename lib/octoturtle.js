/** @module octoturtle */

var Hook = require('./hook.js');

/**
 * Builder function for a new {@link Hook}.
 *
 * @param  {String} event The type of event this hook is responding to.
 * @return {Hook} A new {@link Hook}.
 */
module.exports = function(event) {
  return new Hook(event);
};

/**
 * @see Github
 */
module.exports.Github = require('./github.js');
