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
  //默认 false，也就是不不开启
  watch: true,
  //只有开启监听模式时，watchOptions才有意义
  wathcOptions: {
    //默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    //监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000
  },
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