var gulp = require('gulp'),
    wiredep = require('wiredep'),
    plumber = require('gulp-plumber'),
    cssPrefixed = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

// Clean build
gulp.task('clean', function (cb) {
    del(['src/public/assets/*'], cb);
});

// Handle frontend JS build
gulp.task('script', function () {
    return gulp.src('src/public/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('src/public/assets/'));

});

// Handle CSS build
gulp.task('style', function () {
    return gulp.src('src/public/css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('src/public/assets'));
});

// Wire in dependencies
gulp.task('bower:wire', function (cb) {
    wiredep({src: './src/public/*.html', dest: './src/public/*.html'}, cb);
});

// Combo tasks!
gulp.task('default', ['clean', 'script', 'style', 'bower:wire']);