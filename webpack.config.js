var path = require('path');

module.exports = {
  entry: './static/index.jsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
			compact: false,
          	presets: ['env']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        },
        test: /\.jsx$/
      },
      {
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.jsx$/
      },
    ]
  },
};
