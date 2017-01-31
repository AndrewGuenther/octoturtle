/**
 * Generates a function which takes an event type and hook context and
 * applies a set of labels to the referenced issue or pull request
 *
 * @param  {Array} labels An array of labels to apply to the issue or pull
 *                        request
 * @return {Hook~action} A function which will apply the given labels to an
 *                       issue or pull request referenced in the context
 */
const applyLabels = function applyLabels(labels) {
  return (event, context, github) => {
    github.applyLabels(labels);
  };
};

/**
 * Generates a function which takes an event type and hook context and
 * applies leaves a comment on the referenced issue or pull request
 *
 * @param  {String} comment The comment to be left on the issue or pull
 *                          request
 * @return {Hook~action} A function which will leave the given comment on the
 *                       issue or pull request referenced in the context
 */
const addComment = function addComment(comment) {
  return (event, context, github) => {
    github.addComment(comment);
  };
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
 * @return {Hook~action} A function which will post the given status to the pull
 *                       request referenced in the context.
 */
const postStatus = function postStatus(state, targetUrl, description, context) {
  return (event, context, github) => {
    github.postStatus(state, targetUrl, description, context);
  };
};

module.exports = {
  addComment,
  applyLabels,
  postStatus,
};
