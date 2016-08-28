'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cssnext = require('postcss-cssnext'),
    cssmin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    postcss = require('gulp-postcss'),
    url = require('postcss-url'),
    jscs = require('gulp-jscs'),
    uglify = require('gulp-uglify'),
    include = require('gulp-html-tag-include');

var paths = {
    css: 'static/css/',
    js: 'static/js/',
    html: {
        templates: 'templates/',
        index: ''
    },
    vendors: 'static/vendors/**/',
    build: 'build/'
}

var pluginspostcss = [cssnext(), url({url: 'copy', assetsPath: 'img/'})];

//Отслеживание изменений
gulp.task('watch', function() {
    gulp.watch(paths.js + '*.js', ['js']);
    gulp.watch(paths.css + '*.css', ['css']);

});

//Кодстайл
gulp.task('csscomb', function() {
    return gulp.src(paths.css + 'style.css')
        .pipe(csscomb())
        .pipe(gulp.dest(paths.css));
});

gulp.task('jscs', function() {
    return gulp.src(paths.js + 'script.js')
        .pipe(jscs())
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest(paths.js));
});

gulp.task('comb', ['csscomb', 'jscs'], function() {
    return gulp.src('')
        .pipe(notify({ message: 'Finished with codestyle'}));
});

//Cборка css
gulp.task('css', ['csscomb'], function () {
    return gulp.src(paths.css + 'style.css')
        .pipe(postcss(pluginspostcss, {
            from: paths.css + 'style.css',
            to: paths.build + 'style.css'
        }))
        .pipe(gulp.dest(paths.build));
});

//Cборка js
gulp.task('js', ['jscs'], function () {
    return gulp.src(paths.js + 'script.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest(paths.build));
});

//Сборка vendors js
gulp.task('vendorsjs', function () {
    return gulp.src(paths.vendors + '*.js')
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(paths.build));
});

//Сборка vendors css
gulp.task('vendorscss', function () {
    return gulp.src(paths.vendors + '*.css')
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest(paths.build));
});

//Шаблонизация
gulp.task('html', function() {
    return gulp.src(paths.html.templates + '*.html')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(include())
        .pipe(gulp.dest(paths.build));
});

//Сборка проекта
gulp.task('build', ['html', 'css', 'js', 'vendorscss', 'vendorsjs'], function() {
    return gulp.src('')
        .pipe(notify({ message: 'Finished with build'}));
});

//Минификация
gulp.task('uglify', function () {
    return gulp.src(paths.build + 'script.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.build));
});

gulp.task('cssmin', function () {
    return gulp.src(paths.build + 'style.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build));
});

gulp.task('minify', ['uglify', 'cssmin'], function() {
    return gulp.src('')
        .pipe(notify({ message: 'Finished with minification'}));
});

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
