const RESPONSES = require('../responses');

/**
 * Copies a template response from the responses/ directory
 * @param {String} response The response to load
 * @return {Object} an object representation of the response JSON
 */
function buildResponse(response) {
  return Object.assign({}, RESPONSES[response]);
}

module.exports = {
  buildResponse,
};
