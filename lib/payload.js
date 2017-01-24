/**
 * Wrapper for a webhook payload. Provides a set of convenience functions for
 * accessing commonly used fields. Further documentation on webhook payloads can
 * be found here: {@link https://developer.github.com/webhooks/#payloads}
 */
class Payload {

  /**
   * Takes in a simple Github payload object and creates a {@link Payload}.
   *
   * @param  {Object}  payload Raw Github webhook payload
   * @return {Payload}         An extended Payload object with accessor functions.
   */
  static extendPayload(payload) {
    return Object.setPrototypeOf(payload, Payload.prototype);
  }

  /**
   * @return {String} The 'action' field of the payload.
   */
  getAction() {
    return this.action;
  }

  /**
   * @return {String}  The full name of the repository in the form of
   * "UserName/repository".
   */
  getRepo() {
    return this.repository.name;
  }

  /**
   * @return {String}  The user name of the repository owner.
   */
  getRepoOwner() {
    return this.repository.owner.login;
  }

  /**
   * @return {String}  The requester of the issue or pull request.
   */
  getSender() {
    return this.sender.login;
  }

  /**
   * @return {int}  The issue number.
   */
  getIssueNumber() {
    return this.issue.number;
  }

  /**
   * @return {String}  The body text of the issue.
   */
  getIssueBody() {
    return this.issue.body;
  }

  /**
   * @return {String}  The body text of the comment.
   */
  getCommentBody() {
    return this.comment.body;
  }

  /**
   * @return {String}  The API url for the repository.
   */
  getRepoUrl() {
    return this.repository.url;
  }

  /**
   * @return {String}  The API url for the issue.
   */
  getIssueUrl() {
    return this.issue.url;
  }

  /**
   * @return {String}  The API url for the pull request.
   */
  getPullRequestUrl() {
    return this.pull_request.url;
  }

  /**
   * @return {String}  The API url for the issue's labels.
   */
  getLabelUrl() {
    return this.issue.labels_url;
  }

  /**
   * @return {String}  The API url for the comments on an issue.
   */
  getCommentUrl() {
    return this.issue.comments_url;
  }

  /**
   * @return {String} The API url for the status of a PR.
   */
  getStatusUrl() {
    return this.pull_request.statuses_url;
  }

}

module.exports = Payload;
