var Github = require('../lib/github.js');
var Hook = require('../lib/payload.js');

describe('Generates Github API reactions for hooks', function() {
  var github;
  const USER = "AndrewGuenther";
  const TOKEN = "sEcReT";

  beforeEach(function() {
    github = new Github(USER, TOKEN);
    spyOn(github, 'sendRequest');
  });

  it('builds functions to apply labels', function() {
    var reaction = github.applyLabels(['test']);
    var response = buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.labels_url,
        ['test']);
  });

  it('builds functions to send comments', function() {
    var reaction = github.addComment('test');
    var response = buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.comments_url,
        'test');
  });

  it('builds functions to post statuses', function() {
    var status = {
      state: 'success',
      target_url: 'http://www.github.com/AndrewGuenther/octoturtle',
      description: 'Tests are passing!',
      context: 'octoturtle'
    };
    var reaction = github.postStatus(status.state, status.target_url,
        status.description, status.context);
    var response = buildResponse('propened');
    reaction('pull_request', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.pull_request.statuses_url, status);
  });
});
