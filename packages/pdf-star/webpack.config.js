const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const commonConfig = {
  entry: {
    app: './src/js/app.js',
    about: './src/js/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    //   new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin( 'vendors'),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    //    new BundleAnalyzerPlugin()
  ],
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      watchOptions: {
        // Delay the rebuild after the first change
        aggregateTimeout: 300,

        // Poll using interval (in ms, accepts boolean too)
        poll: 1000,
      },
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      overlay: {
        errors: true,
        warnings: true,
      } 
    },
    plugins: [
      // Ignore node_modules so CPU usage with poll
      // watching drops significantly
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, 'node_modules'),
      ]),
    ],
    module: {
      rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      }
      ]
    }

  };

  return merge(commonConfig, config);
};


module.exports = (env) => {
  if (env.prod) {
    return productionConfig();
  }

  return developmentConfig();
};

