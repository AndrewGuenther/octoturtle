const octoturtle = require('octoturtle');
const config = require('./config.json');

const whenAn = octoturtle;
const github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

const hook = whenAn('issue_comment').is('created').to('octoturtle');

/**
 * Checks if the body of the item contains the string "#dibs".
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function commentContainsDibs(event, payload) {
  payload.getCommentBody().includes('#dibs');
}

hook.if(commentContainsDibs, github.applyLabels(['status/claimed']));
