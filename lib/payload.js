var API_URL = "https://api.github.com";

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
 * Payload.prototype.buildRepoUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.buildRepoUrl = function() {
  return [API_URL, 'repos', this.getRepoOwner(), this.getRepo()].join('/');
};

/**
 * Payload.prototype.buildIssueUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.buildIssueUrl = function() {
  return [this.buildRepoUrl(), 'issues', this.getIssueNumber()].join('/');
};

/**
 * Payload.prototype.buildLabelUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.buildLabelUrl = function() {
  return [this.buildIssueUrl(), 'labels'].join('/');
};

/**
 * Payload.prototype.buildCommentUrl - description
 *
 * @return {type}  description
 */
Payload.prototype.buildCommentUrl = function() {
  return [this.buildIssueUrl(), 'comments'].join('/');
};

module.exports = Payload;
