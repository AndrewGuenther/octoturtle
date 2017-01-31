const Hook = require('../lib/context');
const util = require('./helpers/response-helper');
const proxyquire = require('proxyquire');

describe('Generates Github API reactions for hooks', () => {
  let requestSpy;
  let github;
  const USER = 'AndrewGuenther';
  const TOKEN = 'sEcReT';

  beforeEach(() => {
    requestSpy = jasmine.createSpy('request');
    github = proxyquire('../lib/github', {
      request: requestSpy,
    })(USER, TOKEN);
    spyOn(github, 'sendRequest').and.callThrough();
  });

  it('builds functions to apply labels', () => {
    const context = Hook.extendContext(util.buildResponse('issuesopened'));
    github.applyLabels(context, ['test']);
    expect(github.sendRequest).toHaveBeenCalledWith(
        context.issue.labels_url,
        ['test']);
  });

  it('builds functions to send comments', () => {
    const context = Hook.extendContext(util.buildResponse('issuesopened'));
    github.addComment(context, 'test');
    expect(github.sendRequest).toHaveBeenCalledWith(
        context.issue.comments_url,
        'test');
  });

  it('builds functions to post statuses', () => {
    const context = Hook.extendContext(util.buildResponse('propened'));
    const status = {
      state: 'success',
      target_url: 'http://www.github.com/AndrewGuenther/octoturtle',
      description: 'Tests are passing!',
      statusContext: 'octoturtle',
    };
    github.postStatus(context, status.state, status.target_url,
        status.description, status.statusContext);
    expect(github.sendRequest).toHaveBeenCalledWith(
        context.pull_request.statuses_url, status);
  });

  it('can send raw requests to the Github API', () => {
    const expectedOptions = {
      auth: { user: USER, pass: TOKEN },
      method: 'POST',
      json: true,
      headers: { 'User-Agent': 'Octoturtle' },
      url: 'https://api.github.com',
      body: 'test!',
    };
    github.sendRequest(expectedOptions.url, expectedOptions.body);
    expect(requestSpy).toHaveBeenCalledWith(
        jasmine.objectContaining(expectedOptions), jasmine.any(Function));
  });
});
