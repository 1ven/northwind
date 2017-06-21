const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  entry: './src',
  output: {
    library: 'LibraryName',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;