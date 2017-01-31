const octoturtle = require('octoturtle');
const addComment = require('octoturtle/actions').addComment;
const config = require('./config.json');

const whenAn = octoturtle(config.GITHUB_USER, config.GITHUB_TOKEN);
const hook = whenAn('issue').is('created').to('octoturtle');

/**
 * Reads the ISSUE_TEMPLATE.md file from master and ensures the issue contains
 * all markdown headings present.
 */
function doesNotFollowIssueTemplate(event, context, github) {
  // Underneath, this makes a request that could be cached.
  const template = github.getIssuesTemplate();
  const mdHeadings = /^#+ (.*)$/g;

  const headings = template.match(mdHeadings);
  const issueBody = context.getIssueBody();
  let matchesAll = true;

  for (const heading of headings) {
    matchesAll = issueBody.includes(heading) ? matchesAll : false;
  }

  return !matchesAll;
}

const passiveAggressiveReprimand = `
Thank you for helping us catch bugs!

Please follow the issue filing guidelines outlines in the template.
`;
hook.if(doesNotFollowIssueTemplate, addComment(passiveAggressiveReprimand));

module.exports = hook;
