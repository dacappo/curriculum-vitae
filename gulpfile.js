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
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build/'));
});

/* Main build instruction */
gulp.task('build', ['combine']);