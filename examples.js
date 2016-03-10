var octoturtle = require('./octoturtle.js');
var config = require('./config.json');

var github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

var hook = octoturtle.whenAn('issues').is('opened').to('octoturtle')
    .by('AndrewGuenther');

hook.do(github.applyLabels(['enhancement']));

/**
 * Checks if the body of the item contains the string "dibs".
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function bodyContainsDibs(event, payload) {
  payload.getIssueBody().includes('dibs');
}

hook.when(bodyContainsDibs, github.applyLabels(['dibs']));

octoturtle.express([hook], config).listen(4637, '127.0.0.1', function() {
  console.log('server has started');
});
