const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __DEV__ = process.env.NODE_ENV !== 'production'

const faviconPath = './src/images/favicon.ico'

module.exports = {
  entry: {
    index: './src/js/first.js',
    last: './src/js/last.js',
    'leopard-choose': './src/js/leopard-choose.js',
    'leopard-body': './src/js/leopard-body.js',
    'leopard-nose': './src/js/leopard-nose.js',
    'leopard-claw': './src/js/leopard-claw.js',
    'leopard-eye': './src/js/leopard-eye.js'
  },
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
      chunks: ['index'],
      template: './index.html',
      filename: 'index.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['leopard-choose'],
      template: './leopard-choose.html',
      filename: 'leopard-choose.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['leopard-body'],
      template: './leopard-body.html',
      filename: 'leopard-body.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['leopard-nose'],
      template: './leopard-nose.html',
      filename: 'leopard-nose.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['leopard-eye'],
      template: './leopard-eye.html',
      filename: 'leopard-eye.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['leopard-claw'],
      template: './leopard-claw.html',
      filename: 'leopard-claw.html',
      favicon: faviconPath
    }),
    new HtmlWebpackPlugin({
      chunks: ['last'],
      template: './last.html',
      filename: 'last.html',
      favicon: faviconPath
    })
  ],
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}
