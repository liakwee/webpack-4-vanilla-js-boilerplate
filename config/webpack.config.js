const path = require('path');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: {
    app: path.join(config.root, config.paths.src, 'scripts/index.js')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['./node_modules', './src']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  mode: ['production', 'development'].includes(config.env) ? config.env : 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.src),
    watchContentBase: true,
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host
  },
  module: {
    rules: loaders
  },
  plugins,
  optimization: {
    // prevent to duplicate dependencies
    splitChunks: {
      chunks: 'all'
    }
  }
};
