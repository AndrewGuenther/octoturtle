var any = require('./conditions.js').any;

var Hook = function(event) {
  this.event = event;
  this.actions = [];
  this.repositories = [];
  this.senders = [];
  this.reactions = [];
}

Hook.prototype.is = function() {
  this.actions = this.actions.concat(arguments);
  return this;
}

Hook.prototype.to = function() {
  this.repositories = this.repositories.concat(arguments);
  return this;
}

Hook.prototype.by = function() {
  this.senders = this.senders.concat(arguments);
  return this;
}

Hook.prototype.do = function() {
  this.reactions.push(arguments);
  return this;
}

Hook.prototype.eval = function(event, payload) {
  if ((event != this.event) ||
      (this.actions.length && !this.actions.includes(payload['action'])) ||
      (this.repositories.length && !this.repositories.includes(payload['repository']['full_name'])) ||
      (this.senders.length && !this.senders.includes(payload['sender']['login']))) {
    return false;
  }

  reactions.forEach(function(reaction) {
    reaction(event, payload);
  })
}

module.exports = Hook;
