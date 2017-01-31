const whenA = require('octoturtle');
const github = require('octoturtle/github')(config.GITHUB_USER, config.GITHUB_TOKEN);
const config = require('./config.json');

const hook = whenA('pull_request').is('opened').to('octoturtle');

/**
 * Reads the MAINTAINERS file from master and adds a reviewer to the opened PR.
 */
function addMaintainerAsReviewer(event, context) {
  // Underneath, this makes a request that could be cached.
  const maintainerFile = github.getFileContents(context, 'MAINTAINERS');
  const maintainerString = /^\* @([a-zA-z0-9_-]+)/g;

  const maintainers = maintainerFile.match(maintainerString);
  const reviewer = maintainers[Math.floor(Math.random() * maintainers.length)];

  github.sendRequest(`${context.getPullRequestUrl()}/requested_reviewers`, {
    reviewers: [reviewer],
  });
}

hook.do(addMaintainerAsReviewer);

module.exports = hook;
