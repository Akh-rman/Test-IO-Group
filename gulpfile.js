var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    del = require('del'),
    rev = require('gulp-rev'),
    watch = require('gulp-watch');

gulp.task('jshint', function() {
    return gulp.src('app/script/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {
    return del(['dist/']);
});

gulp.task('usemin', ['jshint'], function() {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [cleanCSS(), rev()],
        js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    return watch('{app/styles/*.css, app/script/*.js, app/*.html}', ['usemin']);
});

// Default task 
gulp.task('default', ['clean', 'watch', 'usemin']);