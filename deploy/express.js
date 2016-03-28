/** @module deploy/express */

var express = require('express');
var bodyparser = require('body-parser');
var xhub = require('express-x-hub');

/**
 * Builds a new express app which know how to evaluate hooks.
 *
 * @param  {Array}  hooks  The hooks to be evaluated when the endpoint is called.
 * @param  {Object} config Configuration information.
 * @return {Object}        An express app object which can be started by calling
 *                         listen().
 */
module.exports = function(hooks, config) {
  var app = express();

  if (config.HOOK_SECRET) {
    app.use(xhub({algorithm: 'sha1', secret: config.HOOK_SECRET}));
  }
  app.use(bodyparser.json());

  app.post(config.HOOK_PATH, function(req, res) {
    var event = req.get('X-GitHub-Event');
    if (event === undefined) {
      res.status(400).send({error: "Missing event header"});
      return;
    }

    console.log("Valid hook received");
    res.status(204).send();
    hooks.forEach(function(hook) {
      console.log("Evaluating hook");
      hook.eval(event, req.body);
    });
  });

  return app;
};
