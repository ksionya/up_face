const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gcmq = require('gulp-group-css-media-queries');
const fileinclude = require('gulp-file-include');



// Таск для сборки HTML и шаблонов
gulp.task('html', function(callback) {
    return gulp.src('./html/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'HTML include',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(fileinclude({ prefix: '@@' }))
        .pipe(gulp.dest('./'))
    callback();
});

// Таск для компиляции SCSS в CSS
gulp.task('scss', function(callback) {
    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            indentType: "tab",
            indentWidth: 1,
            outputStyle: "expanded"
        }))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
    callback();
});

//Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {

    // Следим за картинками и скриптами и обновляем браузер
    watch(['./js/**/*.*', './images/**/*.*'], gulp.parallel(browserSync.reload));

    // Слежение за HTML и CSS и обновление браузера
    watch(['./*.html'], gulp.parallel(browserSync.reload));

    // Слежение за SCSS и компиляция в CSS
    watch('./scss/**/*.scss', gulp.parallel('scss'));
})

// Слежение за HTML и сборка страниц и шаблонов
watch('./html/**/*.html', gulp.parallel('html'))

// Задача для старта сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
  // browserSync.init({
  //   proxy: "http://localhost:8070/"
  //
  // })
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', gulp.parallel('server', 'watch', 'scss', 'html'));
