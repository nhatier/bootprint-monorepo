const jsdoc2md = require('jsdoc-to-markdown')

/**
 * Uses `jsdoc-to-markdown` to render jsdoc for files matching a given glob pattern
 * @param {string} globPattern a glob-pattern to identify the files to generate docs from
 * @returns {string} the generated API reference as markdown
 * @api public
 */
function jsdoc (globPattern) {
  return jsdoc2md.render({ files: globPattern })
    .catch((e) => {
      if (e.name === 'JSDOC_ERROR') {
        // Backward compatibility: Deprecated for 2.0
        throw e
      }
      // Give a hint where other errors occur, but include the original error
      const error = new Error(`Error while rendering jsdoc for "${globPattern}": ${e.message}`)
      error.cause = e
      throw error
    })
}

module.exports = {
  jsdoc
}
