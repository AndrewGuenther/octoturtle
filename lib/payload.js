var API_URL = "https://api.github.com";

var Payload = function() {};

Payload.prototype.getAction = function () {
  return this['action'];
};

Payload.prototype.getRepo = function () {
  return this['repository']['name'];
};

Payload.prototype.getRepoOwner = function () {
  return this['repository']['owner']['login'];
};

Payload.prototype.getSender = function () {
  return this['sender']['login'];
};

Payload.prototype.getIssueNumber = function () {
  return this['issue']['number'];
};

Payload.prototype.getIssueBody = function () {
  return this['issue']['body'];
};

Payload.prototype.getCommentBody = function () {
  return this['comment']['body'];
};

Payload.prototype.buildRepoUrl = function() {
  return [API_URL, 'repos',this.getRepoOwner(), this.getRepo()].join('/');
}

Payload.prototype.buildIssueUrl = function () {
  return [this.buildRepoUrl(), 'issues', this.getIssueNumber()].join('/');
};

Payload.prototype.buildLabelUrl = function () {
  return [this.buildIssueUrl(), 'labels'].join('/');
};

Payload.prototype.buildCommentUrl = function () {
  return [this.buildIssueUrl(), 'comments'].join('/');
};

var extendPayload = function(payload) {
  return Object.setPrototypeOf(payload, Payload.prototype);
}

module.exports = extendPayload;
