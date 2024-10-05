const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const root = 'public'
const PORT = process.env.PORT || 3000

// browsersync local static server
const server = function () {
  browserSync.init({
    server: root,
    port: PORT,
    ...(process.env.IS_DOCKER && { open: false })
  })
}

// Files to watch for changes then reload browser
const watch = function () {
  const html = `${root}/**/*.html`
  const css = `${root}/**/*.css`
  const js = `${root}/**/*.js`

  // Use gulp internal and polling if working in Windows WSL2 to enable hot reload
  gulp.watch(html,
    (process.env.USE_POLLING && { interval: 1000, usePolling: true })
  ).on('change', browserSync.reload)

  gulp.watch(css,
    (process.env.USE_POLLING && { interval: 1000, usePolling: true })
  ).on('change', browserSync.reload)

  gulp.watch(js,
    (process.env.USE_POLLING && { interval: 1000, usePolling: true })
  ).on('change', browserSync.reload)
}

// Gulp tasks
gulp.task('browserSync', server)
gulp.task('watch', watch)
gulp.task('dev', gulp.series(gulp.parallel('browserSync', 'watch')))
