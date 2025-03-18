const { src, dest, task, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');

const plugins = [
  cssnano({ preset: 'default' }),
  mqpacker({ sort: sortCSSmq })
];


function scssMin() {
  return src('./src/**/*.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('assets/styles'), { sourcemaps: true });
}

function syncInit() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
}

async function sync() {
  browserSync.reload()
}

function watchFiles() {
  syncInit()
  scssMin()
  watch('./src/**/*.scss', scssMin)
  watch('./*.html', sync)
  watch('./src/**/*.js', sync)
}


task('watch', watchFiles);