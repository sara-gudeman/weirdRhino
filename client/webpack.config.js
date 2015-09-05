var webpack = require('webpack');

module.exports = {
  context: __dirname,
  // entry point for bundle
  entry: [
    __dirname + '/spec/MainSearchSpec'
  ],

  output: {
    path: __dirname + '/spec',
    filename: 'spec.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony', 'babel-loader'] },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};