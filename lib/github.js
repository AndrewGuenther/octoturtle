var request = require('request');

/**
 * All requests are sent with these options.
 *
 * @private
 */
const DEFAULT_OPTIONS = {
  method: 'POST',
  json: true,
  headers: {
    'User-Agent': 'Octoturtle'
  }
};

/**
 * A Github API wrapper which supplies multiple function generators for use with
 * {@link Hook}s
 *
 * @param  {String} user  API actions will be made on behalf of this user
 * @param  {String} token API token or password for the user
 * @class
 */
function Github(user, token) {
  this.options = Object.assign({
    auth: {
      user: user,
      pass: token
    }
  }, DEFAULT_OPTIONS);
}

/**
 * Make a call to the GitHub API
 *
 * @param {String} url API endpoint for request
 * @param {Object} body The body of the request
 */
Github.prototype.sendRequest = function(url, body) {
  var options = Object.assign({}, this.options);
  options.url = url;
  options.body = body;
  request(options, resultCallback);
};

/**
 * Generates a function which takes an event type and hook payload and
 * applies a set of labels to the referenced issue or pull request
 *
 * @param  {Array} labels An array of labels to apply to the issue or pull
 *                        request
 * @return {Function} A function which will apply the given labels to an
 *                    issue or pull request referenced in the payload
 */
Github.prototype.applyLabels = function(labels) {
  return (event, payload) =>
    this.sendRequest(payload.getLabelUrl(), labels);
};

/**
 * Generates a function which takes an event type and hook payload and
 * applies leaves a comment on the referenced issue or pull request
 *
 * @param  {String} comment The comment to be left on the issue or pull
 *                          request
 * @return {Function} A function which will leave the given comment on the
 *                    issue or pull request referenced in the payload
 */
Github.prototype.addComment = function(comment) {
  return (event, payload) =>
    this.sendRequest(payload.getCommentUrl(), comment);
};

/**
 * Posts a status on a PR using the Github status API.
 *
 * @param  {String} state         The state of the status. Can be one of
 *                                pending, success, error, or failure.
 * @param  {String} [targetUrl]   The target URL to associate with this status.
 *                                This URL will be linked from the GitHub UI to
 *                                allow users to easily see the 'source' of
 *                                the Status.
 * @param  {String} [description] A short description of the status.
 * @param  {String} [context]     A string label to differentiate this status
 *                                from the status of other systems.
 * @return {Function} A function which will post the given status to the pull
 *                    request referenced in the payload.
 */
Github.prototype.postStatus = function(state, targetUrl, description,
    context) {
  return (event, payload) =>
    this.sendRequest(payload.getStatusUrl(), {
      state: state,
      target_url: targetUrl,
      description: description,
      context: context
    });
};

/**
 * Default request result handler for all API calls
 *
 * @private
 * @param  {String} error The error as a string
 */
function resultCallback(error) {
  if (error) {
    console.error(error);
  }
}

module.exports = Github;
