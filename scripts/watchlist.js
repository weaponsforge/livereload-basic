
/**
 * Loads list of file extensions to watch for changes
 * in the `"public"` directory for live reload.
 * @returns {string[]} List of file extensions
 */
export const loadWatchlist = () => {
  const defaultFiles = ['html', 'css', 'js']
  const files = process.env.EXTRA_WATCHLIST ?? ''

  const filesList = files
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '')


  return Array.from(new Set([...defaultFiles, ...filesList]))
}
