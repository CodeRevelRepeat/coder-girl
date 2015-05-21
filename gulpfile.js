﻿var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass') ;
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// file path structure
var paths = {
  scripts: ['public/**/*.js'],
  html: ['public/**/*.html'],
  server: ['server/**/*.js'],
  test: ['specs/**/*.js'],
  sass: ['public/styles/style.scss']
};

// convert sass to css and store it in /dist
gulp.task('sass', function(done) {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(sass({sourcemap: true}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist/'));
});

//on every new build, wipe previous build files
gulp.task('clean', function () {
  return gulp.src(['dist/js', 'dist/index.html'], {read: false})
    .pipe(clean());
});

gulp.task('compile', function(){
  var b = browserify();
  b.transform(reactify); 
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('compress', function() {
  gulp.src('./dist/js/*.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('run', shell.task([ 
  'cd server && nodemon server.js'
]));

//gulp.task('testScript', shell.task([ 
//  'npm test'
//]));

gulp.task('build', function(callback) {
  runSequence('clean', 'compile', 'copy', 'sass', callback);
});

gulp.task('default', ['build', 'watch', 'run']);

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['build']);
});