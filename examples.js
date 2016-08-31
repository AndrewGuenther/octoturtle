var octoturtle = require('./octoturtle.js');
var config = require('./config.json');

console.log(octoturtle.Github)
var github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

var hook = octoturtle('issues').is('opened').to('octoturtle')
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

hook.if(bodyContainsDibs, github.applyLabels(['dibs']));
