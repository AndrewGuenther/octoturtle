const whenA = require('octoturtle');
const addComment = require('octoturtle/actions').addComment;
const github = require('octoturtle/github')(config.GITHUB_USER, config.GITHUB_TOKEN);
const config = require('./config.json');

const hook = whenA('pull_request').is('opened', 'edited').to('octoturtle');

/**
 * Ensures that all commits in the pull request are signed with a developer
 * certificate of origin.
 */
function commitsDoNotContainDCO(event, context) {
  // Underneath, this makes a request that could be cached.
  const commits = github.getCommits(context);

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
hook.if(commitsDoNotContainDCO, addComment(passiveAggressiveReprimand));

module.exports = hook;
