const Payload = require('../lib/payload');
const util = require('./helpers/response-helper');

describe('Provides convenience functions for accessing webhook Payload fields', () => {
  const issuePayload = util.buildResponse('issuesopened');
  Payload.extendPayload(issuePayload);

  const prPayload = util.buildResponse('propened');
  Payload.extendPayload(prPayload);

  const commentPayload = util.buildResponse('issuecomment');
  Payload.extendPayload(commentPayload);

  it('adds getters to existing Payload objects', () => {
    expect(Payload.prototype.isPrototypeOf(issuePayload)).toEqual(true);
  });

  const getters = [
    { func: issuePayload.getAction.bind(issuePayload),
      value: issuePayload.action },
    { func: issuePayload.getRepo.bind(issuePayload),
      value: issuePayload.repository.name },
    { func: issuePayload.getRepoOwner.bind(issuePayload),
      value: issuePayload.repository.owner.login },
    { func: issuePayload.getSender.bind(issuePayload),
      value: issuePayload.sender.login },
    { func: issuePayload.getIssueNumber.bind(issuePayload),
      value: issuePayload.issue.number },
    { func: issuePayload.getIssueBody.bind(issuePayload),
      value: issuePayload.issue.body },
    { func: commentPayload.getCommentBody.bind(commentPayload),
      value: commentPayload.comment.body },
    { func: issuePayload.getRepoUrl.bind(issuePayload),
      value: issuePayload.repository.url },
    { func: issuePayload.getIssueUrl.bind(issuePayload),
      value: issuePayload.issue.url },
    { func: issuePayload.getLabelUrl.bind(issuePayload),
      value: issuePayload.issue.labels_url },
    { func: issuePayload.getCommentUrl.bind(issuePayload),
      value: issuePayload.issue.comments_url },
    { func: prPayload.getStatusUrl.bind(prPayload),
      value: prPayload.pull_request.statuses_url },
  ];
  for (const getter of getters) {
    it(`exposes the ${getter.func.name.replace('get', '')}`, () => {
      expect(getter.func()).toEqual(getter.value);
    });
  }
});
