const octoturtle = require('octoturtle');
const config = require('./config.json');

const whenA = octoturtle;
const github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

const hook = whenA('pull_request').is('opened').to('octoturtle');

/**
 * Reads the MAINTAINERS file from master and adds a reviewer to the opened PR.
 *
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function addMaintainerAsReviewer(event, payload) {
  // Underneath, this makes a request that could be cached.
  const maintainerFile = payload.getFileContents('MAINTAINERS');
  const maintainerString = /^\* @([a-zA-z0-9_-]+)/g;

  const maintainers = maintainerFile.match(maintainerString);
  const reviewer = maintainers[Math.floor(Math.random() * maintainers.length)];

  github.sendRequest(`${payload.getPullRequestUrl()}/requested_reviewers`, {
    reviewers: [reviewer],
  });
}

hook.do(addMaintainerAsReviewer);
