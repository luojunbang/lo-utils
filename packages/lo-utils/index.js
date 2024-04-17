'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lo-utils.min.cjs')
} else {
  module.exports = require('./lo-utils.cjs')
}
