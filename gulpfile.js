const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const uglify       = require('gulp-uglify');
const rename       = require('gulp-rename');
const del          = require('del');
const zip          = require('gulp-zip');

const baseRootDir   = 'src/';
const bundledJsName = 'mimosa.min.js';
const entryScripts  = [baseRootDir + 'mimosa.ts'];

gulp.task('dist:js', function () {
    return gulp
        .src([ 'src/*.js' ])
        //.pipe(concat())
        .pipe(plumber())
        .pipe(uglify({ preserveComments: 'license' }))
        .pipe(rename(bundledJsName))
        .pipe(gulp.dest('dist/out'));
});

gulp.task('dist:prebuilt', function () {
    return gulp.src([ 'monaco-prebuilt/**' ]).pipe(gulp.dest('dist/out'));
});

gulp.task('dist:clean', function () {
    return del([ 'dist' ]);
});

gulp.task('dist', [ 'dist:js', 'dist:prebuilt' ], function () {
    return gulp.src('dist/out/*')
        .pipe(zip('mimosa.zip'))
        .pipe(gulp.dest('dist'));
});
