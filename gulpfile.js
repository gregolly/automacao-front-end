//Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//função para compilar o sass e adicionar os prefixos
function compilaSass(){
  return gulp
  .src('css/scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoPrefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

//tarefa de gulp para função de sass
gulp.task('sass', compilaSass);

//função para juntar os js
function gulpJS(){
  return gulp
  .src('js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS)

//JS plugins
function pluginJS(){
  return gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/moment/min/moment.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}
gulp.task('pluginjs', pluginJS)

//função para iniciar o browser
function browser(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
}

//tarefa para inciar o browser-sync
gulp.task('browser-sync', browser);

//função para observer funções do gulp
function watch(){
  gulp.watch('css/scss/**/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

//incia a tarefa do watch
gulp.task('watch', watch)
//tarefa padrão do gulp que inicia o watch e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));