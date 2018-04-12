//loading plugins
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'); 
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const pump = require('pump');
const browserSync = require('browser-sync').create();

// tasks

// Sass | Autoprefix, compress and move to ./dist
gulp.task('sass', function () {
    return gulp.src('src/assets/sass/main.scss')
        .pipe(notify('CSS Complete'))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./dist/css/'));
});

// Move HTML pages to ./dist
gulp.task('moveIndex', function () {
    return gulp.src('src/public/index.html')
        .pipe(notify('HTML Files has been moved'))
        .pipe(gulp.dest('./dist'));
});

// Concat all JS file to bundle.js
gulp.task('concatJS', function () {
    return gulp.src('./src/assets/js/components/*.js')
        // .pipe(babel())
        .pipe(concat('main.min.js'))
        .pipe(notify('JS Files has been Concatened'))
        .pipe(gulp.dest('./src/assets/js/'));
});

// Uglify the main JS file
gulp.task('uglifyJS', function (cb) {
    pump([
        gulp.src('src/assets/js/main.min.js'),
        uglify(),//babel(),
        gulp.dest('./dist/js/')

    ],cb
  );
});

// Move images to ./dist
gulp.task('moveImages', function () {
    return gulp.src('src/public/img/**/*.*')
        .pipe(gulp.dest('./dist/img'));
});

// Move fonts files to ./dist
gulp.task('moveFonts', function () {
    return gulp.src('src/assets/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Move framework7 to ./dist
gulp.task('moveLibs', function () {
    return gulp.src('src/assets/lib/**/*.*')
        .pipe(gulp.dest('./dist/lib'));
});

// BrowserSync init localhost
gulp.task('server', function () {
    browserSync.init({
        server: "./dist"
    });
});

// The gulp eyes are in you
gulp.task('watch', function () {
    gulp.watch('src/assets/sass/**/*.scss', ['sass']);
    gulp.watch('src/public/*.html', ['moveIndex']);
    gulp.watch('src/assets/js/components/*.js', ['concatJS']);
    gulp.watch('src/assets/js/output.js', ['uglifyJS']);
    gulp.watch('src/assets/img/**/*.*', ['moveImages']);
    gulp.watch('src/assets/fonts/**/*.*', ['moveFonts']);
    gulp.watch('src/assets/libs/**/*.*', ['moveLibs']);

    gulp.watch('dist/**/*.*').on('change', browserSync.reload);

});

// gulp Default task
gulp.task('default', ['moveIndex','moveImages','moveLibs','moveFonts','concatJS','uglifyJS','sass','server','watch']);
