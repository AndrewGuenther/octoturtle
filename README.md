# Octoturtle

[![Build Status](https://travis-ci.org/AndrewGuenther/octoturtle.svg?branch=master)](https://travis-ci.org/AndrewGuenther/octoturtle)
[![Coverage Status](https://coveralls.io/repos/github/AndrewGuenther/octoturtle/badge.svg?branch=master)](https://coveralls.io/github/AndrewGuenther/octoturtle?branch=master)
[![Dependency Freshness](https://david-dm.org/AndrewGuenther/octoturtle.svg)]()

Octoturtle is a dead simple fluent library for responding to Github
[webhooks][1]. Primarily inspired by Docker's awesome issue and PR auditor
[@GordonTheTurtle][2], Octoturtle seeks to make it easy for any repository owner to
specify and enforce a set of rules for contributing to a repository.

Here's a simple Octoturtle rule based on Docker's #dibs policy for claiming
issues:
```javascript
const octoturtle = require('octoturtle');
const config = require('./config.json');

const whenAn = octoturtle;
const github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

const hook = whenAn('issues').is('opened').to('octoturtle');

/**
 * Checks if the body of the item contains the string "dibs".
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function bodyContainsDibs(event, payload) {
  payload.getIssueBody().includes('dibs');
}

hook.if(bodyContainsDibs, github.applyLabels(['dibs']));
```

## Installation

You can deploy your own Octoturtle auditor easily using either Express or with
Lambda using Gordon.

First, install [Yeoman][4] and [generator-octoturtle][5] using
[npm][6] (we assume you have pre-installed
[node.js][7]).

```bash
npm install -g yo
npm install -g generator-octoturtle
```

Then generate your new auditor:

```bash
yo octoturtle
```

[1]: https://developer.github.com/webhooks/
[2]: https://www.github.com/GordonTheTurtle
[3]: https://www.github.com/Docker
[4]: http://yeoman.io
[5]: https://github.com/AndrewGuenther/generator-octoturtle
[6]: https://www.npmjs.com/
[7]: https://nodejs.org/
