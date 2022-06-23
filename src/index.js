const dateHandler = require('./extend/dateHandler')
const urlHandler = require('./extend/urlHandler')
const fileHandler = require('./extend/fileHandler')
const validator = require('./extend/validator')
const formatter = require('./extend/formatter')
const helper = require('./extend/helper')
const utils = require('./extend/utils')
const tree = require('./extend/treeHandler')

const webpack = require('./webpack/index')

module.exports = {
  ...dateHandler,
  ...fileHandler,
  ...validator,
  ...urlHandler,
  ...formatter,
  ...helper,
  ...utils,
  ...tree,
  ...webpack,
}
