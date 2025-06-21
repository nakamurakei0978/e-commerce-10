const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js', // Your main server file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'server.bundle.js', // Bundled server file name
  },
  target: 'node', // Crucial for Node.js builds
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  experiments: {
    outputModule: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use if you need Babel for ES6+ features
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};