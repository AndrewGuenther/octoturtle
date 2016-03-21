/**
 * Payload - description
 *
 * @class
 */
function Payload() {}

/**
 * Payload - description
 *
 * @param  {type} payload description
 * @return {type}         description
 */
Payload.extendPayload = function(payload) {
  return Object.setPrototypeOf(payload, Payload.prototype);
};

/**
 * Payload.prototype.getAction - description
 *
 * @return {type}  description
 */
Payload.prototype.getAction = function() {
  return this.action;
};

/**
 * Payload.prototype.getRepo - description
 *
 * @return {type}  description
 */
Payload.prototype.getRepo = function() {
  return this.repository.name;
};

/**
 * Payload.prototype.getRepoOwner - description
 *
 * @return {type}  description
 */
Payload.prototype.getRepoOwner = function() {
  return this.repository.owner.login;
};

/**
 * Payload.prototype.getSender - description
 *
 * @return {type}  description
 */
Payload.prototype.getSender = function() {
  return this.sender.login;
};

/**
 * Payload.prototype.getIssueNumber - description
 *
 * @return {type}  description
 */
Payload.prototype.getIssueNumber = function() {
  return this.issue.number;
};

/**
 * Payload.prototype.getIssueBody - description
 *
 * @return {type}  description
 */
Payload.prototype.getIssueBody = function() {
  return this.issue.body;
};

/**
 * Payload.prototype.getCommentBody - description
 *
 * @return {type}  description
 */
Payload.prototype.getCommentBody = function() {
  return this.comment.body;
};

/**
 * Payload.prototype.getRepoUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.getRepoUrl = function() {
  return this.repository.url;
};

/**
 * Payload.prototype.getIssueUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.getIssueUrl = function() {
  return this.issue.url;
};

/**
 * Payload.prototype.getLabelUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.getLabelUrl = function() {
  return this.issue.labels_url;
};

/**
 * Payload.prototype.getCommentUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.getCommentUrl = function() {
  return this.issue.comments_url;
};

module.exports = Payload;
