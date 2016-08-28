var hooks = require('./hooks.js');
var config = require('./config.json');

exports.handler = require('./handler.js')(hooks, config);
