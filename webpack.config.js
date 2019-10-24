const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  plugins: [
    new CopyPlugin([
      { from: 'public' }
    ])
  ]
};
