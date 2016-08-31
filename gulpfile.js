const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');
const coveralls = require('gulp-coveralls');

gulp.task('docs', (cb) => {
  return gulp.src(['README.md', 'octoturtle.js', './lib/**/*.js'], {read: false})
      .pipe(jsdoc(require('./.jsdoc.json'), cb));
});

gulp.task('pre-test', () => {
  return gulp.src(['octoturtle.js', './lib/**/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(['spec/*.js'])
      .pipe(jasmine())
      .pipe(istanbul.writeReports())
});

gulp.task('lint', () => {
  return gulp.src(['octoturtle.js', './lib/**/*.js','./spec/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('coveralls', () => {
  return gulp.src('./coverage/**/lcov.info')
      .pipe(coveralls());
});

gulp.task('default', ['lint', 'test']);
