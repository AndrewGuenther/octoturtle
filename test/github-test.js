var Github = require('../lib/github.js');
var Hook = require('../lib/payload.js');

describe('Generates Github API reactions for hooks', function() {
  var github;
  var request_spy;
  const USER = "AndrewGuenther";
  const TOKEN = "sEcReT";
  const DEFAULT_OPTIONS = {
    auth: {
      user: USER,
      pass: TOKEN
    },
    method: 'POST',
    json: true,
    headers: {
      'User-Agent': 'Octoturtle'
    }
  };

  beforeEach(function() {
    github = new Github(USER, TOKEN);
    spyOn(github, 'sendRequest');
  })

  it('builds functions to apply labels', function() {
    var reaction = github.applyLabels(['test']);
    var response = buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.labels_url,
        ['test']);
  })

  it('builds functions to send comments', function() {
    var reaction = github.addComment('test');
    var response = buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.comments_url,
        'test');
  })
})
