// Express server
var app = require('express')();

var octoturtle = require('../../octoturtle.js');

const PORT = 80;
const PATH = '/webhook';
const HOOK_SECRET = 'secret';

app.get(PATH, function(req, res) {
  if (req.get('X-Hub-Signature') != HOOK_SECRET) {
    res.status(401).send({error: "Invalid signature"});
  }

  var event = req.get('X-GitHub-Event');
  if (event == undefined) {
    res.status(400).send({error: "Missing event header"});
  }

  try {
    var payload = JSON.parse(req.body);
  } catch (e) {
    res.status(400).send({error: "Malformed request payload"});
  }

  octoturtle.process(event, payload);
  res.status(204).send();
})

app.listen(PORT, function() {
  console.log("Server listening on: localhost:%s", port);
})
