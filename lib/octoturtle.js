/** @module octoturtle */

const Hook = require('./hook');

/**
 * Builder function for a new {@link Hook}.
 *
 * @param  {String} event The type of event this hook is responding to.
 * @return {Hook} A new {@link Hook}.
 */
module.exports = (event) => {
  return new Hook(event);
};
