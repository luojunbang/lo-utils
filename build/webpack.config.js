const path = require('path')

module.exports = {
  entry:  path.resolve(__dirname, '../src/index.js') ,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'loUtils.min.js',
    library: 'loUtils',
    libraryTarget: 'umd',
    globalObject: 'this', // 因为要区分node环境还是window环境 所以要改为this
  },
}
