const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const paths = require('./paths');
const babelConfig = require('./babel.config');

module.exports = {
  // Rules of how webpack will take our files, complie & bundle them for the browser
  resolve: {
    alias: {
      threekit: paths.threekitModule,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: babelConfig.presets,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
        use: ['file-loader?name=[name].[ext]'],
      },
    ],
  },
  plugins: [
    //  Loads in the .env file as well as CLI variables
    new Dotenv({ path: './.env', systemvars: true }),
    new HtmlWebpackPlugin({
      template: paths.appIndexHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};
