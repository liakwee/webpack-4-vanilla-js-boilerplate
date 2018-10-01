const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const pugTemplates = [];
const srcll = fs.readdirSync(path.resolve(__dirname, './src/templates/views'));
srcll.forEach(s => s.endsWith('.pug') && pugTemplates.push(s));
console.log('srcll: ', srcll);

module.exports = {
  entry: {
    app: './src/scripts/index.js'
    // another: './src/scripts/modules/another-module.js' // this is how you add extra modules
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['./src/scripts', './src/styles', './node_modules']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: /src\/icons\/.+\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeMetadata: true },
                { removeDesc: true },
                { removeUselessDefs: true }
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          // fallback to style-loader in development
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: /src\/icons\/.+\.svg$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'raw-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              debug: false,
              compileDebug: false,
              cache: true,
              data: {
                require: require,
                templatelist: pugTemplates
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new SpriteLoaderPlugin(),
    ...pugTemplates.map(
      templateName =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/templates/views/${templateName}`,
          filename: path.join(
            path.resolve(__dirname, 'dist/pages'),
            templateName.replace('.pug', '.html')
          ),
          minify: false,
          alwaysWriteToDisk: true
        })
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/templates/index.pug`,
      filename: path.resolve(__dirname, 'dist/index.html'),
      minify: false,
      alwaysWriteToDisk: true
    }),
    // In general it's good practice to clean the /dist folder before each build,
    // so that only used files will be generated
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    // Enabling Hot Module Replacement
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    // prevent to duplicate dependencies
    splitChunks: {
      chunks: 'all'
    }
  }
};
