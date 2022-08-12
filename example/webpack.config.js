const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
module.exports = {
  mode: 'development',
  entry: resolve('./index.ts'),
  output: {
    clean: true,
    filename: 'js/[name]-[contenthash:8].js',
    chunkFilename: 'js/[name]-[contenthash:8].js',
    path: resolve('./dist'),
  },
  devServer: {
    // port: 7788,
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', { loader: 'class-style-loader', options: { prefix: 'L' } }],
      },
      {
        test: /\.ts$/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, './index.html'),
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    }),
  ],
}
