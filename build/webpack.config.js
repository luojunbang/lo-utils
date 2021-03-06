const path = require('path')
const { doc } = require('./generator_doc')
const isDev = process.env.NODE_ENV === 'development'
// !isDev && doc('./src/utils')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // mode: 'development',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'lo-utils.min.js',
    library: {
      type: 'umd',
      umdNamedDefine: true,
    },
    globalObject: 'this', // 因为要区分node环境还是window环境 所以要改为this
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  resolve: {
    alias: {
      '@': 'src',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimizer: [],
  },
}
