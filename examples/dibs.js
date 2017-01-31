const whenAn = require('octoturtle');
const applyLabels = require('octoturtle/actions').applyLabels;
const config = require('./config.json');

const hook = whenAn('issue_comment').is('created').to('octoturtle');

/**
 * Checks if the body of the item contains the string "#dibs".
 */
function commentContainsDibs(event, context) {
  return context.getCommentBody().includes('#dibs');
}

hook.if(commentContainsDibs, applyLabels(['status/claimed']));

module.exports = hook;
