const Payload = require('./payload');

/**
 * Builder function for reactions.
 *
 * @private
 * @param  {Hook~condition} condition The action will only be performed if this
 *    function returns true.
 * @param  {function} action The action to perform if the condition returns
 *    true.
 * @return {function} A function which will evaluate the condition, perform the
 *    action, and return whether the reaction was performed.
 */
const createReaction = function createReaction(condition, action) {
  return (event, payload) => {
    if (condition(event, payload)) {
      action(event, payload);
      return true;
    }
    return false;
  };
};

const convenienceNames = new Map([
  ['issue', 'issues'],
]);

/**
 * Some event names don't fit the API very well, so we allow users to specify
 * them by a more "convenient" name in order to improve fluency and prevent
 * bugs
 *
 * @private
 * @param  {String} eventName The user-provided event name.
 * @return {String} The translated Github API event name.
 */
const fromConvenientEventName = function fromConvenientEventName(eventName) {
  return convenienceNames.has(eventName) ? convenienceNames.get(eventName) : eventName;
};

/**
 * A set of conditions and response actions for Github webhook payloads.
 */
class Hook {

  /**
   * Create a Hook
   * @param  {String} event The type of event which this hook will respond to.
   */
  constructor(event) {
    this.event = fromConvenientEventName(event);
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
  is(...actions) {
    this.actions = this.actions.concat(actions);
    return this;
  }

  /**
   * Applies a filter based on the repository the webhook was fired against.
   *
   * @param {...String} repositories Repositories to filer on.
   * @return {Hook}
   */
  to(...repositories) {
    this.repositories = this.repositories.concat(repositories);
    return this;
  }

  /**
   * Applies a filter based on the initiator of the action.
   *
   * @param {...String} senders Sender usernames to filter on.
   * @return {Hook}
   */
  by(...senders) {
    this.senders = this.senders.concat(senders);
    return this;
  }

  /**
   * @callback Hook~action
   * @param  {String}  event   The webhook event type.
   * @param  {Payload} payload The raw webhook payload.
   */

  /**
   * Specify an action which will be performed assuming all filter requirements
   * are met.
   *
   * @param  {Hook~action} action function to be executed.
   * @return {Hook}
   */
  do(action) {
    this.reactions.push(createReaction(() => {
      return true;
    }, action));
    return this;
  }

  /**
   * Conditions are called when evaluating whether or not to perform an action
   * @callback Hook~condition
   * @param  {String}  event   The webhook event type.
   * @param  {Payload} payload The raw webhook payload.
   * @return {boolean} Returns true if the action should be performed.
   */

  /**
   * Perform an action only if an additional condition is met.
   *
   * @param  {Hook~condition} condition The action will only be performed if this
   *    function returns true.
   * @param  {Hook~action} action The action to perform if the condition returns
   *    true.
   * @return {Hook}
   */
  if(condition, action) {
    this.reactions.push(createReaction(condition, action));
    return this;
  }

  /**
   * Given a payload, evaluate all specified filters and perform any given
   * reactions.
   *
   * @param  {String} event The webhook event type.
   * @param  {Object} payload The raw webhook payload.
   * @return {Boolean} Returns true if <em>any</em> action is performed.
   *    Otherwise, returns false.
   */
  eval(event, rawPayload) {
    const payload = Payload.extendPayload(rawPayload);
    if ((event !== this.event) ||
        (this.actions.length &&
            this.actions.indexOf(payload.getAction()) === -1) ||
        (this.repositories.length &&
            this.repositories.indexOf(payload.getRepo()) === -1) ||
        (this.senders.length &&
            this.senders.indexOf(payload.getSender()) === -1)) {
      return false;
    }

    let reacted = false;
    this.reactions.forEach((reaction) => {
      reacted = reaction(event, payload) || reacted;
    });

    return reacted;
  }
}

module.exports = Hook;
