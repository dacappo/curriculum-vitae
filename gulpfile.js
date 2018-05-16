const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      minifyCss = require('gulp-minify-css'),
      uglify = require('gulp-uglify'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if')
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
        .pipe(gulp.dest('build/'));
});

/* Copy all static images */
gulp.task('images', function() {
    return gulp.src('images/**/*')
      .pipe(imagemin({optimizationLevel: 5}))
      .pipe(gulp.dest('build/images'));
  });

/* Main build instruction */
gulp.task('build', ['combine', 'images']);