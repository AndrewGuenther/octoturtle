var extendPayload = require('./payload.js');

var Hook = function(event) {
  this.event = event;
  this.actions = [];
  this.repositories = [];
  this.senders = [];
  this.reactions = [];
}

var Reaction = function(condition, action) {
  return function(event, payload) {
    if (condition(event, payload)) { action(event, payload); }
  }
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

Hook.prototype.do = function(action) {
  this.reactions.push(Reaction(function() {
    return true;
  }, action));
  return this;
}

Hook.prototype.when = function(condition, action) {
  this.reactions.push(Reaction(condition, action));
  return this;
};

Hook.prototype.eval = function(event, payload) {
  payload = extendPayload(payload);
  if ((event != this.event) ||
      (this.actions.length && this.actions.indexOf(payload.getAction()) != -1) ||
      (this.repositories.length && this.repositories.indexOf(payload.getRepo()) != -1) ||
      (this.senders.length && this.senders.indexOf(payload.getSender()) != -1)) {
    console.log("Payload did not match hook. Returning");
    return false;
  }

  console.log("Payload matched hook. Reacting");
  this.reactions.forEach(function(reaction) {
    reaction(event, payload);
  });
}

module.exports = Hook;
