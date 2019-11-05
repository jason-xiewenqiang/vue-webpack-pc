/**
 * @author jason-xiewenqiang
 * @description webpack base configuration
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'none',
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:4].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.json', '.vue'],
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','less-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            title: 'vue-webpack-project',
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            filename: 'index.html',
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new VueLoaderPlugin(),
        new AutoDllPlugin({
            inject: true,
            debug: true,
            filename: '[name]_[hash:4].js',
            path: './dll',
            entry: {
                vendor: ['vue']
            }
        }),
        new webpack.optimize.SplitChunksPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[id].css"
        })
    ]
}