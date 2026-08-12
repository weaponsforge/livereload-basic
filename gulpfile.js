import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import browserSync from 'browser-sync'
import * as dartSass from 'sass'
import { FILES, loadWatchlist } from './scripts/watchlist.js'

const bSync = browserSync.create()
const sass = gulpSass(dartSass)

const root = 'public'
const PORT = process.env.PORT || 3000

// Load supported file extensions
const fileExtensions = loadWatchlist()
const fileWatchList = fileExtensions.map(file => `${root}/**/*.${file}`)
console.log(`[LOG] watching files: ${fileExtensions.toString()}\n`)

// Use gulp interval and polling if working in Windows WSL2 to enable hot reload
const pollingOptions = process.env.USE_POLLING === 'true'
  ? { interval: 1000, usePolling: true }
  : undefined

// browsersync local static server
const server = function () {
  bSync.init({
    server: root,
    port: PORT,
    ...(process.env.IS_DOCKER && { open: false })
  })
}

// SASS styles - compile scss to css
const scssToCss = () => {
  return gulp.src(`${root}/**/*.${FILES.SCSS}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(root))
    .pipe(bSync.stream())
}

const watch = function () {
  fileWatchList.forEach(file => {
    if (file.endsWith(`.${FILES.SCSS}`)) {
      gulp.watch(file, pollingOptions, scssToCss)
    } else if (file.endsWith(`.${FILES.CSS}`)) {
      gulp.watch(file, pollingOptions).on('change', changedPath => {
        gulp.src(changedPath).pipe(bSync.stream())
      })
    }
    else {
      // Files to watch for changes then reload browser
      gulp.watch(file, pollingOptions).on('change', bSync.reload)
    }
  })
}

// Gulp tasks
gulp.task('browserSync', server)
gulp.task('watch', watch)
gulp.task('dev', gulp.series(scssToCss, gulp.parallel('browserSync', watch)))
