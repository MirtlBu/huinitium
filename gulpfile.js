'use strict';

const series = require('gulp'),
    parallel = require('gulp'),
    gulp = require('gulp'),
    del = require("del"),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminPngquant = require('imagemin-pngquant'),
    include = require('gulp-html-tag-include'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');

//изменяет рабочую папку на "static"
process.chdir('static');

const paths = {
    css: 'css/',
    js: 'js/',
    img: 'img/',
    html: {
        templates: 'templates/',
        index: ''
    },
    vendors: 'vendors/',
    build: '../build/'
}

function server() {
    connect.server({
        root: paths.build,
        livereload: false,
        name: 'Huinitum server',
        port: '8000'
    });
}

function clean() {
  return (async () => {
        const deletedPaths = await del([paths.build], {force: true});
        console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
    })();
}

function css() {
    return gulp.src(['../node_modules/reset-css/reset.css', paths.css + '*.css'])
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.build));
}

function js() {
    return gulp.src(paths.js + '*.js')
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(paths.build));
}

function img() {
    return (async () => {
        const files = await imagemin([paths.img], {
            destination: paths.build + '/img',
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.91, 0.91],
                    dithering: false
                })
            ]
        });
    })();
}

function html() {
    return gulp.src(paths.html.templates + '*.html')
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(paths.build));
}

function css_minifier() {
    return gulp.src(paths.build + 'style.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build));
}

function js_uglifier() {
    return gulp.src(paths.build + 'script.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.build));
}

function watcher() {
    gulp.watch('**/*.css', css);
    gulp.watch('**/*.js', js);
    gulp.watch('**/*.html', html);
    gulp.watch('**/*.jpg', img);
    gulp.watch('**/*.png', img);
}

const build = gulp.series(clean, gulp.parallel(css, js, html, img));
const start = gulp.series(build, gulp.parallel(server, watcher));
const prod = gulp.series(clean, gulp.parallel(css, js, html, img), gulp.parallel(css_minifier, js_uglifier));

exports.prod = prod;
exports.start = start;
exports.default = start;
