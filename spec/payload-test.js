const Context = require('../lib/context');
const util = require('./helpers/response-helper');

describe('Provides convenience functions for accessing webhook Context fields', () => {
  const issueContext = util.buildResponse('issuesopened');
  Context.extendContext(issueContext);

  const prContext = util.buildResponse('propened');
  Context.extendContext(prContext);

  const commentContext = util.buildResponse('issuecomment');
  Context.extendContext(commentContext);

  it('adds getters to existing Context objects', () => {
    expect(Context.prototype.isPrototypeOf(issueContext)).toEqual(true);
  });

  const getters = [
    { func: issueContext.getAction.bind(issueContext),
      value: issueContext.action },
    { func: issueContext.getRepo.bind(issueContext),
      value: issueContext.repository.name },
    { func: issueContext.getRepoOwner.bind(issueContext),
      value: issueContext.repository.owner.login },
    { func: issueContext.getSender.bind(issueContext),
      value: issueContext.sender.login },
    { func: issueContext.getIssueNumber.bind(issueContext),
      value: issueContext.issue.number },
    { func: issueContext.getIssueBody.bind(issueContext),
      value: issueContext.issue.body },
    { func: commentContext.getCommentBody.bind(commentContext),
      value: commentContext.comment.body },
    { func: issueContext.getRepoUrl.bind(issueContext),
      value: issueContext.repository.url },
    { func: issueContext.getIssueUrl.bind(issueContext),
      value: issueContext.issue.url },
    { func: issueContext.getLabelUrl.bind(issueContext),
      value: issueContext.issue.labels_url },
    { func: issueContext.getCommentUrl.bind(issueContext),
      value: issueContext.issue.comments_url },
    { func: prContext.getStatusUrl.bind(prContext),
      value: prContext.pull_request.statuses_url },
  ];
  for (const getter of getters) {
    it(`exposes the ${getter.func.name.replace('get', '')}`, () => {
      expect(getter.func()).toEqual(getter.value);
    });
  }
});
