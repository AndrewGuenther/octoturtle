[![Build Status](https://travis-ci.org/AndrewGuenther/octoturtle.svg?branch=master)](https://travis-ci.org/AndrewGuenther/octoturtle)
[![Coverage Status](https://coveralls.io/repos/github/AndrewGuenther/octoturtle/badge.svg?branch=master)](https://coveralls.io/github/AndrewGuenther/octoturtle?branch=master)

Octoturtle is a dead simple fluent library for responding to Github
[1][webhooks]. Primarily inspired by Docker's awesome issue and PR auditor
@GordonTheTurtle, Octoturtle seeks to make it easy for any repository owner to
specify and enforce a set of rules for contributing to a repository.

Here's a simple Octoturtle rule based on Docker's #dibs policy for claiming
issues:
```javascript
WhenAn('issue_comment').is('created').if(issueBodyContainsDibs,
    gh.applyLabels('issue/claimed'));

function issueBodyContainsDibs(event, payload) {
  payload.getIssueBody().includes('#dibs');
}
```

[1][https://api.github.com]
[2][https://www.github.com/GordonTheTurtle]
[3][https://www.github.com/Docker]
