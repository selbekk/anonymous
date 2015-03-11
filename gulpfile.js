var gulp = require('gulp'),
    wiredep = require('wiredep'),
    plumber = require('gulp-plumber'),
    cssPrefixed = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    transform = require('vinyl-transform');

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};


// Clean build
gulp.task('clean', function (cb) {
    del(['src/public/assets/*'], cb);
});

// Handle frontend JS build
gulp.task('script', function () {
    // transform regular node stream to gulp (buffered vinyl) stream
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src('src/public/js/**/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(browserified)
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