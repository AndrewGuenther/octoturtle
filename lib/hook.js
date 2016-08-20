var Payload = require('./payload.js');

/**
 * A set of conditions and response actions for Github webhook payloads.
 *
 * @param  {String} event The type of event which this hook will respond to.
 * @class
 */
function Hook(event) {
  this.event = event;
  this.actions = [];
  this.repositories = [];
  this.senders = [];
  this.reactions = [];
}

/**
 * Applies a filter based on the "action" field of a webhook payload.
 *
 * @param  {...String} actions Actions to filter on.
 * @return {Hook}
 */
Hook.prototype.is = function() {
  this.actions = this.actions.concat(Array.from(arguments));
  return this;
};

/**
 * Applies a filter based on the repository the webhook was fired against.
 *
 * @param {...String} repositories Repositories to filer on.
 * @return {Hook}
 */
Hook.prototype.to = function() {
  this.repositories = this.repositories.concat(Array.from(arguments));
  return this;
};

/**
 * Applies a filter based on the initiator of the action.
 *
 * @param {...String} senders Sender usernames to filter on.
 * @return {Hook}
 */
Hook.prototype.by = function() {
  this.senders = this.senders.concat(Array.from(arguments));
  return this;
};

/**
 * Specify and action which will be performed assuming all filter requirements
 * are met.
 *
 * @param  {Function} action Function to be executed.
 * @return {Hook}
 */
Hook.prototype.do = function(action) {
  this.reactions.push(createReaction(function() {
    return true;
  }, action));
  return this;
};

/**
 * Perform an action only if an additional condition is met.
 *
 * @param  {Function} condition The action will only be performed if this
 *                              function returns true.
 * @param  {Function} action    The action to perform if the condition returns
 *                              true.
 * @return {Hook}
 */
Hook.prototype.if = function(condition, action) {
  this.reactions.push(createReaction(condition, action));
  return this;
};

/**
 * Given a payload, evaluate all specified filters and perform any given
 * reactions.
 *
 * @param  {String}  event   The webhook event type.
 * @param  {Payload} payload The raw webhook payload.
 * @return {Boolean}         Returns true if <em>any</em> action is performed.
 *                           Otherwise, returns false.
 */
Hook.prototype.eval = function(event, payload) {
  payload = Payload.extendPayload(payload);
  if ((event !== this.event) ||
      (this.actions.length &&
          this.actions.indexOf(payload.getAction()) === -1) ||
      (this.repositories.length &&
          this.repositories.indexOf(payload.getRepo()) === -1) ||
      (this.senders.length &&
          this.senders.indexOf(payload.getSender()) === -1)) {
    return false;
  }

  var reacted = false;
  this.reactions.forEach(function(reaction) {
    reacted = reaction(event, payload) || reacted;
  });

  return reacted;
};

/**
 * Builder function for reactions.
 *
 * @private
 * @param  {Function} condition The action will only be performed if this
 *         function returns true.
 * @param  {Function} action    The action to perform if the condition returns
 *         true.
 * @return {Function}           A function which will evaluate the condition,
 *                              perform the action, and return whether the
 *                              reaction was performed.
 */
function createReaction(condition, action) {
  return function(event, payload) {
    if (condition(event, payload)) {
      action(event, payload);
      return true;
    }
    return false;
  };
}

module.exports = Hook;
