// Express server
var express = require('express');
var bodyparser = require('body-parser')
var crypto = require('crypto');

module.exports = function(hooks, config) {
  var app = express();
/*
  app.use(function(req, res, next) {
      var data = '';
      req.on('data', function(chunk) {
          data += chunk;
      });
      req.on('end', function() {
          req.rawBody = data;
          next();
      });
  });
  */
  app.use(bodyparser.json());

  app.post(config.HOOK_PATH, function(req, res) {
    /*
    var signature = 'sha1=' + crypto.createHmac('sha1', config.HOOK_SECRET).update(req.rawBody).digest('hex');
    if (req.get('X-Hub-Signature') != signature) {
      res.status(401).send({error: "Invalid signature"});
      console.log("Expected: " + signature);
      console.log("Received: " + req.get('X-Hub-Signature'));
      return;
    }
    */

    var event = req.get('X-GitHub-Event');
    if (event == undefined) {
      res.status(400).send({error: "Missing event header"});
      return;
    }

    console.log("Valid hook received");
    res.status(204).send();
    hooks.forEach(function(hook) {
      console.log("Evaluating hook");
      hook.eval(event, req.body);
    });
  })

  return app;
}
