var webpack = require('webpack');
var RewirePlugin = require("rewire-webpack");

module.exports = {
  context: __dirname,
  // entry point for bundle
  entry: {
    MainSearchSpec: __dirname + '/spec/MainSearchSpec'
  },

  output: {
    path: __dirname + '/spec/test-build',
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony', 'babel-loader'] },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new RewirePlugin()
  ]
};