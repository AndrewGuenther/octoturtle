var hooks = require('./hooks.js');
var config = require('./config.json');
var server = require('./server.js');

server(hooks, config).listen(8080, '127.0.0.1', function() {
  console.log('server has started');
});
