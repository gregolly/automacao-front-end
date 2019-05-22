const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');

function compilaSass(){
  return gulp
  .src('css/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoPrefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
}

gulp.task('sass', compilaSass);

function watch(){
  gulp.watch('css/scss/*.scss', compilaSass);
}

gulp.task('default', watch);