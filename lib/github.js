var request = require('request');
var objectAssign = require('object-assign');

var resultCallback = function(error, response, body) {
  if (error) {
    console.log(error);
  }

  console.log(body);
}

module.exports = function (user, token) {
  const defaultOptions = {
    auth: {
      user: user,
      pass: token
    },
    method: 'POST',
    json: true,
    headers: {
      'User-Agent': 'Octoturtle'
    }
  };

  return {
    applyLabels: function(labels) {
      return function(event, payload) {
        var options = {
          url: payload.buildLabelUrl(),
          body: labels
        };
        request(objectAssign(options, defaultOptions), resultCallback);
      }
    },

    addComment: function(comment) {
      return function(event, payload) {
        var options = {
          url: payload.buildCommentUrl(),
          body: comment
        };
        request(objectAssign(options, defaultOptions), resultCallback);
      }
    }
  }
}
