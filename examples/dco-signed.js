const octoturtle = require('octoturtle');
const config = require('./config.json');

const whenA = octoturtle;
const github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

const hook = whenA('pull_request').is('opened', 'edited').to('octoturtle');

/**
 * Ensures that all commits in the pull request are signed with a developer
 * certificate of origin.
 *
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function commitsDoNotContainDCO(event, payload) {
  // Underneath, this makes a request that could be cached.
  const commits = payload.getCommits();

  const commitMessages = commits.forEach((commit) => { return commit.commit.message; });
  const dco = /Signed-off-by: /;
  let allCommitsSigned = true;

  for (const commitMessage of commitMessages) {
    allCommitsSigned = commitMessage.includes(dco) ? allCommitsSigned : false;
  }

  return !allCommitsSigned;
}

const passiveAggressiveReprimand = `
Thank you for submitting a pull request!

Please be sure to sign your commits with a developer certificate of origin using
the -S flag when you commit!

Read more: http://elinux.org/Developer_Certificate_Of_Origin
`;
hook.if(commitsDoNotContainDCO, github.addComment(passiveAggressiveReprimand));
