/*!
 * thought-plugin-jsdoc <https://github.com/nknapp/thought-plugin-jsdoc>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

const path = require('path')

/**
 * Describe your module here
 * @public
 */
module.exports = function thoughtPluginJsdoc (customize) {
  return customize.merge({
    handlebars: {
      helpers: require.resolve('./helpers.js'),
      partials: path.join(__dirname, 'partials')
    }
  })
}

module.exports.package = require('../package')
