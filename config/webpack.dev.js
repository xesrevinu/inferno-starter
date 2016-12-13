const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  bail: true,
  context: resolve(__dirname, '../src'),
  devtool: 'source-map',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './index'
    ]
  },
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [
      "node_modules",
      resolve(__dirname, "../src")
    ],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      },
      { test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    // activates HMR

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new HtmlWebpackPlugin({
      title: 'Hello',
      filename: 'index.html',
      template: 'index.html',
      inject: false,
      appMountId: 'app'
      // template: 'index.html',
      // 开发环境不需要minify
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '../'),
      verbose: true
    })
  ],
  devServer: {
    hot: true,
    // activate hot reloading
    inline: true,

    contentBase: resolve(__dirname, '../dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    quiet: true,

    historyApiFallback: true
  }
}
