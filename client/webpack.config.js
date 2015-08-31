module.exports = {
  context: __dirname,
  entry: [
    './src/components/AppContainer'
    ],
  output: {
      path: __dirname + '/build',
      filename: 'bundle.js'
  },
  module: {
      loaders: [
          { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'] },
      ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};