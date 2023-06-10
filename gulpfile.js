const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')


// Сервер
gulp.task('server', function(){
    browserSync({
        server:{
            baseDir: 'src'
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload)
})

// Работа с стилями
gulp.task('styles', function(){
        return gulp.src('src/sass/**/*.sass')
          .pipe(sass().on('error', sass.logError))
          .pipe(rename({suffix: '.min', preffix: ''}))
          .pipe(autoprefixer())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('dist/css'))
          .pipe(gulp.dest('src/css'));
})

// Сжатие индекса
gulp.task('minify', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
})

// Сжатие изображений
gulp.task('imgmin', function(){
    gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
})

// Отслеживание
gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.+(sass)', gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('minify'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('transfer_script'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('transfer_fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('transfer_icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('imgmin'));
})

// Перенос скриптов, шрифтов и иконок
gulp.task('transfer_script', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
})
gulp.task('transfer_icons', function(){
    return gulp.src('src/icon/**/*')
        .pipe(gulp.dest('dist/icon'))
        .pipe(browserSync.stream());
})
gulp.task('transfer_fonts', function(){
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
})

// Запрос функций
gulp.task('default', gulp.parallel('watch', 'styles', 'server', 'minify', 'imgmin', 'transfer_script', 'transfer_icons', 'transfer_fonts'))