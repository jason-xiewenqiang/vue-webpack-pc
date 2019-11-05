const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      // 压缩 js
      new TerserPlugin({
        test: /\.js$/i,
        cache: path.resolve(__dirname, '../cache'),
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),

      // 压缩分离的 css
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  }
});
