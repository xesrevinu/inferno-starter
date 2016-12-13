const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {
  cache: true,
  context: resolve(__dirname, '../src'),
  devtool: 'cheap-module-source-map',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
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
      'node_modules',
      resolve(__dirname, '../src')
    ],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
         context: __dirname
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // activates HMR
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello',
      template: 'index.html',
      inject: false,
      appMountId: 'app',
      // 开发环境不需要minify
      minify: {
        // removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '../'),
      verbose: true
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: resolve(__dirname, '../dist'),
    publicPath: '/',
    historyApiFallback: true,
    quiet: true,
    watchOptions: {
      ignore: /node_modules/
    }
  }
}
