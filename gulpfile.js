const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');
const coveralls = require('gulp-coveralls');
const babel = require('gulp-babel');

const SOURCES = ['./lib/**/*.js'];
const TEST_SOURCES = ['./spec/**/*.js'];

gulp.task('build', () => {
  return gulp.src(SOURCES)
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('docs', (cb) => {
  return gulp.src(['README.md', ...SOURCES], {read: false})
      .pipe(jsdoc(require('./.jsdoc.json'), cb));
});

gulp.task('pre-test', () => {
  return gulp.src(SOURCES)
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(TEST_SOURCES)
      .pipe(jasmine())
      .pipe(istanbul.writeReports())
});

gulp.task('lint', () => {
  return gulp.src([...SOURCES, ...TEST_SOURCES])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('coveralls', () => {
  return gulp.src('./coverage/**/lcov.info')
      .pipe(coveralls());
});

gulp.task('default', ['lint', 'test']);
gulp.task('dist', ['lint', 'test', 'docs', 'build']);
