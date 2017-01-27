const octoturtle = require('octoturtle');
const config = require('./config.json');

const whenA = octoturtle(config.GITHUB_USER, config.GITHUB_TOKEN);
const hook = whenA('pull_request').is('opened').to('octoturtle');

/**
 * Reads the MAINTAINERS file from master and adds a reviewer to the opened PR.
 */
function addMaintainerAsReviewer(event, payload, github) {
  // Underneath, this makes a request that could be cached.
  const maintainerFile = github.getFileContents('MAINTAINERS');
  const maintainerString = /^\* @([a-zA-z0-9_-]+)/g;

  const maintainers = maintainerFile.match(maintainerString);
  const reviewer = maintainers[Math.floor(Math.random() * maintainers.length)];

  github.sendRequest(`${payload.getPullRequestUrl()}/requested_reviewers`, {
    reviewers: [reviewer],
  });
}

hook.do(addMaintainerAsReviewer);

module.exports = hook;
