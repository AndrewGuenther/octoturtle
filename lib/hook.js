var Payload = require('./payload.js');

/**
 * Hook - description
 *
 * @param  {type} event description
 * @class
 * @static
 */
function Hook(event) {
  this.event = event;
  this.actions = [];
  this.repositories = [];
  this.senders = [];
  this.reactions = [];
}

/**
 * Hook.prototype.is - description
 *
 * @return {type}  description
 */
Hook.prototype.is = function() {
  this.actions = this.actions.concat(arguments);
  return this;
};

/**
 * Hook.prototype.to - description
 *
 * @return {type}  description
 */
Hook.prototype.to = function() {
  this.repositories = this.repositories.concat(arguments);
  return this;
};

/**
 * Hook.prototype.by - description
 *
 * @return {type}  description
 */
Hook.prototype.by = function() {
  this.senders = this.senders.concat(arguments);
  return this;
};

/**
 * Hook.prototype.do - description
 *
 * @param  {type} action description
 * @return {type}        description
 */
Hook.prototype.do = function(action) {
  this.reactions.push(createReaction(function() {
    return true;
  }, action));
  return this;
};

/**
 * Hook.prototype.when - description
 *
 * @param  {type} condition description
 * @param  {type} action    description
 * @return {type}           description
 */
Hook.prototype.when = function(condition, action) {
  this.reactions.push(createReaction(condition, action));
  return this;
};

/**
 * Hook.prototype.eval - description
 *
 * @param  {type} event   description
 * @param  {type} payload description
 * @return {type}         description
 */
Hook.prototype.eval = function(event, payload) {
  payload = Payload.extendPayload(payload);
  if ((event !== this.event) ||
      (this.actions.length && this.actions.indexOf(payload.getAction()) !== -1) ||
      (this.repositories.length && this.repositories.indexOf(payload.getRepo()) !== -1) ||
      (this.senders.length && this.senders.indexOf(payload.getSender()) !== -1)) {
    console.log("Payload did not match hook. Returning");
    return false;
  }

  console.log("Payload matched hook. Reacting");
  this.reactions.forEach(function(reaction) {
    reaction(event, payload);
  });
};

/**
 * createReaction - description
 *
 * @private
 * @param  {type} condition description
 * @param  {type} action    description
 * @return {type}           description
 */
function createReaction(condition, action) {
  return function(event, payload) {
    if (condition(event, payload)) {
      action(event, payload);
    }
  };
}

module.exports = Hook;
