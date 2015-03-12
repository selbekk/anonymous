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
    transform = require('vinyl-transform'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');

// Clean build
gulp.task('clean', function (cb) {
    del(['src/public/assets/*'], cb);
});

// Handle frontend JS build
gulp.task('script', function () {
    console.log('regenerating scripts.min.js');
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

// Handle frontend templates
gulp.task('template', function() {
   console.log('compiling templates...');
    gulp.src('src/public/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Anonymous.templates',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('src/public/assets'));
});

// Handle CSS build
gulp.task('style', function () {
    console.log('regenerating styles.min.js');

    return gulp.src('src/public/css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('src/public/assets'));
});

// Wire in dependencies
gulp.task('bower', function () {
    console.log('wiring up dependencies');

    wiredep({src: './src/public/*.html', dest: './src/public/*.html'});
});

// Re-run frontend build on change
gulp.task('watch', function() {
    gulp.watch('./src/public/**.html', ['bower']);
    gulp.watch('./src/public/js/**/*.js', ['script']);
    gulp.watch('./src/public/css/**/*.css', ['style']);
    gulp.watch('./src/public/templates/**/*.hbs', ['template']);

    console.log("watching for changes in src/public...");
});

// Combo tasks!
gulp.task('default', ['clean', 'script', 'template', 'style', 'bower', 'watch']);