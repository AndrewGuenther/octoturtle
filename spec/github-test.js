const Hook = require('../lib/payload');
const util = require('./helpers/response-helper');
const proxyquire = require('proxyquire');

const requestSpy = jasmine.createSpy();
const Github = proxyquire('../lib/github', {
  request: requestSpy,
});

describe('Generates Github API reactions for hooks', () => {
  let github;
  const USER = 'AndrewGuenther';
  const TOKEN = 'sEcReT';

  beforeEach(() => {
    github = new Github(USER, TOKEN);
    spyOn(github, 'sendRequest');
  });

  it('builds functions to apply labels', () => {
    const reaction = github.applyLabels(['test']);
    const response = util.buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.labels_url,
        ['test']);
  });

  it('builds functions to send comments', () => {
    const reaction = github.addComment('test');
    const response = util.buildResponse('issuesopened');
    reaction('issues', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.issue.comments_url,
        'test');
  });

  it('builds functions to post statuses', () => {
    const status = {
      state: 'success',
      target_url: 'http://www.github.com/AndrewGuenther/octoturtle',
      description: 'Tests are passing!',
      context: 'octoturtle',
    };
    const reaction = github.postStatus(status.state, status.target_url,
        status.description, status.context);
    const response = util.buildResponse('propened');
    reaction('pull_request', Hook.extendPayload(response));
    expect(github.sendRequest).toHaveBeenCalledWith(
        response.pull_request.statuses_url, status);
  });

  it('can send raw requests to the Github API', () => {
    github = new Github(USER, TOKEN);
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
