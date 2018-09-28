const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // any "source-map"-like devtool is possible
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    // suggested official config:
    // contentBase: './dist',
    // hot: true

    // hot reloading html on save - fix / hack:
    // https://github.com/webpack/webpack-dev-server/issues/1271
    contentBase: './src/templates/',
    watchContentBase: true,
    hot: true
  }
});
