var colors = require('colors');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var pkg = require('../../package.json');

global.attachCommonOptions = function(program) {
  program
    .version(pkg.version)
    .usage('[options] [dir]')
    .option('-u, --gh-user [user]',
        'the user to assume when accessing the Github API')
    .option('-t, --gh-token [token]', 'Github API access token')
    .option('-s, --webhook-secret [secret]', 'webhook secret')
    .option('--octoturtle-version [version]',
        'the version of octoturtle to use');

  return program;
};

global.generateApp = function(program, generatorFunc) {
  var destinationPath = program.args.shift() || '.';
  var appName = path.basename(path.resolve(destinationPath));
  var version = program.octoturtleVersion ?
      program.octoturtleVersion : pkg.version;

  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      mkdir(destinationPath, generatorFunc.bind(
          null, version, appName, destinationPath, program));
    } else {
      console.error('ERROR: '.red + destinationPath +
          ' already exists! Aborting.');
    }
  });
};

global.initPkg = function(version, appName, deps) {
  deps.octoturtle = version;
  return {
    name: appName,
    version: '0.0.0',
    main: 'index.js',
    private: true,
    dependencies: deps
  }
};

global.emptyDirectory = function(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
};

// A huge thank you to the contributors over at express. Most of these functions
// are taken from the express-generator.

global.copy = function(from, to) {
  from = path.join(__dirname, '../..', 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
};

global.write = function(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0o666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
};

global.mkdir = function(path, fn) {
  mkdirp(path, 0o755, function(err){
    if (err) throw err;
    console.log('   create'.cyan + ' : ' + path);
    fn && fn();
  });
};

global.loadTemplate = function(name) {
  return fs.readFileSync(path.join(__dirname, '../..', 'templates', name),
      'utf-8');
};
