const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const commonConfig = {
  entry: {
    app: './src/js/app.js',
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
    //   new webpack.optimize.CommonsChunkPlugin( 'vendors'),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../vendor/dll/util-manifest.json'),
    })
  ],
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
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
    },
    plugins: []
  };

  if (process.env.BUNDLE_ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return merge(commonConfig, config);
};


module.exports = (env) => {
  if (env.prod) {
    return productionConfig();
  }

  return developmentConfig();
};

