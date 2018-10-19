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
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['./node_modules', './src']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: /src\/icons\/.+\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'sprite.svg',
              publicPath: '/icons/'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeMetadata: true },
                { removeDesc: true },
                { removeViewBox: true },
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
        test: /\.(png|jpg|jpeg|gif)$/,
        include: /src\/images/,
        exclude: /src\/icons\/.+\.svg$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                gifsicle: {
                  interlaced: true
                },
                mozjpeg: {
                  progressive: true
                },
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        exclude: /src\/icons\/.+\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              attrs: 'img:src xlink:href source:src image:xlink:href'
            }
          },
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jQuery',
      'windows.jQuery': 'jquery'
    }),
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
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    // prevent to duplicate dependencies
    splitChunks: {
      chunks: 'all'
    }
  }
};
