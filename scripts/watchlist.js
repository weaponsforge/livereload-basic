// Default supported files watch list
export const FILES = {
  HTML: 'html',
  CSS: 'css',
  JS: 'js',
  SCSS: 'scss'
}

export const FILES_LIST = Object.values(FILES)

/**
 * Loads list of file extensions to watch for changes
 * in the `"public"` directory for live reload.
 * @returns {string[]} List of file extensions
 */
export const loadWatchlist = () => {
  const files = process.env.EXTRA_WATCHLIST ?? ''

  const filesList = files
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '')

  return Array.from(new Set([...FILES_LIST, ...filesList]))
}
