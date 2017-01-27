/** @module octoturtle */

const Hook = require('./hook');

const buildOctoturtle = function buildOctoturtle(githubUser, githubToken) {
  return (event) => {
    return new Hook(event, githubUser, githubToken);
  };
};

/**
 * Builder function for a new {@link Hook}.
 *
 * @param  {String} event The type of event this hook is responding to.
 * @return {Hook} A new {@link Hook}.
 */
module.exports = buildOctoturtle;
