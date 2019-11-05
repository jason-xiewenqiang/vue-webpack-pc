/**
 * @author jason-xiewenqiang
 * @description webpack base configuration
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    open: true,
    hot: true,
    port: 9000,
    contentBase: __dirname,
    clientLogLevel: 'error',
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})