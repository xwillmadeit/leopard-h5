const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __DEV__ = process.env.NODE_ENV !== 'production'

const faviconPath = './src/images/favicon.ico'

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: __DEV__ ? 'js/[name].chunk.js' : 'js/[name].[chunkhash:6].js',
    publicPath: __DEV__ ? '/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: 'url-loader?limit=8000&name=images/[name].[hash:6].[ext]'
      },
      {
        test: /\.ico$/,
        use: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[contenthash:6].css'),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      favicon: faviconPath
    })
  ],
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}
