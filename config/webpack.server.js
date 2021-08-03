const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',
  watch: true,
  mode: 'production',
  entry: paths.serverIndexJs,
  output: {
    path: paths.serverBuild,
    filename: 'index.js',
  },
  resolve: {
    alias: {
      threekit: paths.threekitModule,
    },
  },
  externalsPresets: { node: true },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    //  Loads in the .env file as well as CLI variables
    new Dotenv({ path: './.env', systemvars: true }),
  ],
};
