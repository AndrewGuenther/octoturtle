var request = require('request');
var objectAssign = require('object-assign');

var resultCallback = function(error, response, body) {
  if (error) {
    console.log(error);
  }

  console.log(body);
}

module.exports = function (user, token) {
  var defaultOptions = {
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
        console.log(objectAssign(options, defaultOptions));
        request(options, resultCallback);
      }
    },

    addComment: function(comment) {
      return function(event, payload) {
        var options = {
          url: payload.buildCommentUrl(),
          body: JSON.stringify(comment)
        };
        console.log(options);
        request(objectAssign(options, defaultOptions), resultCallback);
      }
    }
  }
}
