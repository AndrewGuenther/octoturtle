var request = require('request');
var objectAssign = require('object-assign');

/**
 * A Github API wrapper which supplies multiple function generators for use with
 * {@link Hook}s
 *
 * @param  {String} user  API actions will be made on behalf of this user
 * @param  {String} token API token or password for the user
 * @class
 */
function Github(user, token) {
  this.defaultOptions = {
    auth: {
      user: user,
      pass: token
    },
    method: 'POST',
    json: true,
    headers: {
      'User-Agent': 'Octoturtle'
    }
  };
}

/**
 * Generates a function which takes an event type and hook payload and
 * applies a set of labels to the referenced issue or pull request
 * @param  {Array} labels An array of labels to apply to the issue or pull
 *                        request
 * @return {Function} A function which will apply the given labels to an
 *                    issue or pull request referenced in the payload
 */
Github.prototype.applyLabels = function(labels) {
  return function(event, payload) {
    var options = {
      url: payload.buildLabelUrl(),
      body: labels
    };
    request(objectAssign(options, this.defaultOptions), resultCallback);
  };
};

/**
 * Generates a function which takes an event type and hook payload and
 * applies leaves a comment on the referenced issue or pull request
 * @param  {String} comment The comment to be left on the issue or pull
 *                          request
 * @return {Function} A function which will leave the given comment on the
 *                    issue or pull request referenced in the payload
 */
Github.prototype.addComment = function(comment) {
  return function(event, payload) {
    var options = {
      url: payload.buildCommentUrl(),
      body: comment
    };
    request(objectAssign(options, this.defaultOptions), resultCallback);
  };
};

/**
 * Default request result handler for all API calls
 *
 * @private
 * @param  {String} error The error as a string
 * @param  {http.IncomingMessage} response The response object
 * @param  {Object} body The body of the response as parsed JSON
 */
function resultCallback(error, response, body) {
  if (error) {
    console.log(error);
  }

  console.log(body);
}

module.exports = Github;
