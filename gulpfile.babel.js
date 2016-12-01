var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    annotate = require('gulp-ng-annotate'),
    print = require('gulp-print'),
    babel = require('gulp-babel');

var paths = {
  scssSource: './public/assets/styles/**/*.scss',
  scssDist:'./public/assets/styles',
  jsSource: './public/app/**/*.js',
  jsDist: './dist/public'
};

gulp.task('compileJS', function(){
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(annotate())
  .pipe(babel({presets: ["es2015"]}))
  .pipe(gulp.dest(paths.jsDist));
});

gulp.task('compileStyles', function(){
  return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDist));
});

gulp.task('watch', function(){
  gulp.watch(paths.jsSource, ['compileJS']);
  gulp.watch(paths.scssSource, ['compileStyles']);
});

gulp.task('default', ['watch', 'compileJS', 'compileStyles']);
