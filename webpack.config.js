const webpack = require('webpack')
const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssnext = require('postcss-cssnext')
const pxtorem = require('postcss-pxtorem')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const workDir = __dirname
const cleanDir = ['dist']
const publicPath = isProd
  ? '/assets' // assets path or cdn
  : '/'
const vendor = [
  'core-js/es6',
  'inferno-compat',
  'inferno-router',
  'inferno-mobx',
  'react-tap-event-plugin',
  'history'
]

const entryFile = isProd ? {
  app: './src/index',
  vendor: vendor
} : {
  app: [
    // 'react-hot-loader/patch',
    './src/index'
  ],
  vendor: vendor
}

let loaders = {
  ts: {
    test: /\.(tsx?)$/,
    use: ['babel-loader', 'ts-loader'],
    exclude: /(node_modules)/
  },
  js: {
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    test: /\.js$/,
    enforce: 'pre',
    use: 'source-map-loader'
  },
  css: {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: false,
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  },
  scss: {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  svg: {
    test: /\.svg$/,
    loaders: [{
      loader: 'react-svg-loader',
      query: {
        svgo: {
          plugins: [{removeTitle: false}],
          floatPrecision: 2
        }
      }}
    ]
  }
}

const prodLoaders = {
  css: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader'
    })
  },
  scss: {
    test: /\.scss$/,
    loader:  ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader!sass-loader'
    })
  }
}

let prodPostcssPlugins = [
  require('cssnano')({
    safe: true,
    sourcemap: true,
    autoprefixer: false
  })
]

let postcssPlugins = [
  cssnext({
    browsers: ['last 2 versions', 'IE > 10'],
  }),
  pxtorem({
    rootValue: 100,
    propWhiteList: [],
  })
]

if (isProd) {
  postcssPlugins = postcssPlugins.concat(prodPostcssPlugins)
  loaders = Object.assign({}, loaders, prodLoaders)
}

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(nodeEnv),
    },
    '__DEV__': !isProd
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: postcssPlugins
    },
    minimize: isProd
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: Infinity
  }),
  new HtmlWebpackPlugin({
    title: 'Hello',
    template: './src/index.html',
    inject: false,
    appMountId: 'app',
    minify: isProd ? {
      removeComments: true,
      collapseWhitespace: true
    } : {}
  })
]

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

const prodPlugins = [
  new CleanWebpackPlugin(cleanDir, {
    root: workDir,
    verbose: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      screw_ie8: true
    }
  }),
  new ExtractTextPlugin('css/[name].[hash].css')
]

const plugins = basePlugins
.concat(!isProd ? devPlugins : [])
.concat(isProd ? prodPlugins : [])

module.exports = {
  cache: isProd,
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  target: 'web',
  performance: {
    hints: false
  },
  entry: entryFile,
  output: {
    path: join(workDir, './dist'),
    publicPath: publicPath,
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js'
  },
  resolve: {
    extensions: ['.web.js', '.tsx', '.ts', '.js'],
    modules: [
      'node_modules',
      workDir
    ],
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  },
  module: {
    loaders: [
      loaders.js,
      loaders.ts,
      loaders.css,
      loaders.scss,
      loaders.svg,
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: !isProd ? 'file-loader' : 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: !isProd ? 'file-loader?limit=1024' : 'file-loader?limit=1024&name=images/[hash:6].[ext]'
      }
    ]
  },
  plugins: plugins,
  devServer: {
    hot: true,
    inline: true,
    contentBase: join(workDir, './dist'),
    host: '0.0.0.0',
    publicPath: publicPath,
    historyApiFallback: true,
    quiet: true,
    watchOptions: {
      ignore: /node_modules/
    }
  }
}
