const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      minifyCss = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if'),
      del = require('del');

/* Clean build directory */
gulp.task('clean', function() {
    return del(['build/**/*']);
});

/* Combine and minify scripts and stylesheets */
gulp.task('combine', function () {              
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(useref({}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/'));
});

/* Copy all static images */
gulp.task('images', function() {
    return gulp.src('images/**/*')
      .pipe(imagemin({optimizationLevel: 5}))
      .pipe(gulp.dest('build/images'));
});

/* Copy favicon to build directory */
gulp.task('copy-favicon', function() {
    return gulp.src('favicon.*')
        .pipe(gulp.dest('build/'));
  });

/* Main build instruction */
gulp.task('build', gulp.series('combine', 'images', 'copy-favicon'));

