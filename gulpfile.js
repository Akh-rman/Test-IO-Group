var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    del = require('del'),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');

gulp.task('jshint', function() {
    return gulp.src('app/script/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {
    return del(['dist/']);
});

gulp.task('imagemin', function() {
    return del(['dist/images']), gulp.src('app/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, verbose: true }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', ['jshint'], function() {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [cleanCSS(), rev()],
        js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copyfonts', ['clean'], function() {
    gulp.src('app/fonts/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
    return watch('{app/styles/*.css, app/script/*.js, app/*.html}', ['usemin']);
});

// Default task 
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});