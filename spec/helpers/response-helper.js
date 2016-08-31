const RESPONSES = require('../responses');

global.buildResponse = function(response) {
  return Object.assign({}, RESPONSES[response]);
};
