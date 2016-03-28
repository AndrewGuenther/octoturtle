/**
 * Wrapper for a webhook payload. Provides a set of convenience functions for
 * accessing commonly used fields. Further documentation on webhook payloads can
 * be found here:
 *
 * @class
 */
function Payload() {}

/**
 * Takes in a simple Github payload object and creates a {@link Payload}.
 *
 * @param  {Object}  payload Raw Github webhook payload
 * @return {Payload}         An extended Payload object with accessor functions.
 */
Payload.extendPayload = function(payload) {
  return Object.setPrototypeOf(payload, Payload.prototype);
};

/**
 * @return {String} The 'action' field of the payload.
 */
Payload.prototype.getAction = function() {
  return this.action;
};

/**
 * @return {String}  The full name of the repository in the form of
 * "UserName/repository".
 */
Payload.prototype.getRepo = function() {
  return this.repository.name;
};

/**
 * @return {String}  The user name of the repository owner.
 */
Payload.prototype.getRepoOwner = function() {
  return this.repository.owner.login;
};

/**
 * @return {String}  The requester of the issue or pull request.
 */
Payload.prototype.getSender = function() {
  return this.sender.login;
};

/**
 * @return {int}  The issue number.
 */
Payload.prototype.getIssueNumber = function() {
  return this.issue.number;
};

/**
 * @return {String}  The body text of the issue.
 */
Payload.prototype.getIssueBody = function() {
  return this.issue.body;
};

/**
 * @return {String}  The body text of the comment.
 */
Payload.prototype.getCommentBody = function() {
  return this.comment.body;
};

/**
 * @return {String}  The API url for the repository.
 */
Payload.prototype.getRepoUrl = function() {
  return this.repository.url;
};

/**
 * @return {String}  The API url for the issue.
 */
Payload.prototype.getIssueUrl = function() {
  return this.issue.url;
};

/**
 * @return {String}  The API url for the issue's labels.
 */
Payload.prototype.getLabelUrl = function() {
  return this.issue.labels_url;
};

/**
 * @return {String}  The API url for the comments on an issue.
 */
Payload.prototype.getCommentUrl = function() {
  return this.issue.comments_url;
};

module.exports = Payload;
