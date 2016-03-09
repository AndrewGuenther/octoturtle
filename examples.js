var octoturtle = require('./octoturtle.js');
var config = require('./config.json');
var app = require('./deploy/express/server.js');

var github = octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

var hook = octoturtle.WhenAn('issues').is('opened').to('octoturtle')
    .by('AndrewGuenther');

hook.do(github.applyLabels(['enhancement']));

function bodyContainsDibs(event, payload) {
  payload.getIssueBody().includes('dibs');
}

hook.when(bodyContainsDibs, github.applyLabels(['dibs']));

app([hook], config).listen(4637, '127.0.0.1', function() {
  console.log('server has started');
});
