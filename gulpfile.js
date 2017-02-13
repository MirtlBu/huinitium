'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    include = require('gulp-html-tag-include'),
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssnext = require('postcss-cssnext'),
    resemble_image = require('postcss-resemble-image').default,
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');

//изменяет рабочую папку на "static"
process.chdir('static');

var paths = {
    postcss: 'postcss/',
    js: 'js/',
    img: 'img/',
    html: {
        templates: 'templates/',
        index: ''
    },
    vendors: 'vendors/',
    build: '../build/'
}

var pluginspostcss = [
    resemble_image({selectors: ['.resemble_image'], fidelity: '25%'}),
    cssnext()
];

gulp.task('connect', function() {
  connect.server({
    root: '../build',
    livereload: false,
    name: 'Huinitum server',
    port: '8000'
  });
});

gulp.task('start', ['build', 'connect'], function () {
  gulp.watch(['**/*.{js,postcss,html,jpg,jpeg,png,gif,svg}'], ['build']);
});

//вариант с livereload в браузере
// gulp.task('connect', function() {
//   connect.server({
//     root: '../build',
//     livereload: true,
//     name: 'Huinitum server',
//     port: '8000'
//   });
// });

// gulp.task('reload', function () {
//   gulp.src('**/*.{js,postcss,html,jpg,jpeg,png,gif,svg}')
//     .pipe(connect.reload());
// });

// gulp.task('start', ['build', 'connect'], function () {
//   gulp.watch(['**/*.{js,postcss,html,jpg,jpeg,png,gif,svg}'], ['build', 'reload']);
// });


gulp.task('imagesOptimization', function() {
    return gulp.src(paths.img + '*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.build + 'img/'))
});

//Cборка css
gulp.task('css', function () {
    return gulp.src([paths.postcss + 'reset.postcss', paths.postcss + '*.postcss'])
        .pipe(concat('style.postcss'))
        .pipe(postcss(pluginspostcss))
        .pipe(rename({
                extname: '.css'
            }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.build));
});

//Cборка js
gulp.task('js', function () {
    return gulp.src(paths.js + '*.js')
        .pipe(concat('script.js'))
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest(paths.build));
});

//Сборка vendors js
gulp.task('vendorsjs', function () {
    return gulp.src(paths.vendors + '**/*.js')
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(paths.build));
});

//Сборка vendors css
gulp.task('vendorscss', function () {
    return gulp.src(paths.vendors + '**/*.css')
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
gulp.task('build', ['imagesOptimization', 'html', 'css', 'js', 'vendorscss', 'vendorsjs'], function() {
    return gulp.src('')
        .pipe(notify({message: 'Finished with build'}));
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
