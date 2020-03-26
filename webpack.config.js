const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const isProd = process.env.NODE_ENV === 'production';
console.log(isProd, process.env.analyzer);

const config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash:4].js',
        chunkFilename: 'js/[name].[chunkhash:6].js'
    },
    devServer: {
        hot: true,
        port: 8080,
        open: true,
        host: 'localhost',
        compress: true,
        useLocalIp: false,
        contentBase: './dist',
        clientLogLevel: 'error',
        disableHostCheck: true,
        historyApiFallback: true,
        // overly: true,
        proxy: {}
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.js', '.vue', '.es6'],
        modules: [path.resolve(__dirname, 'node_modules')],
        mainFields: ['browser', 'module', 'main']
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                        loader: 'thread-loader',
                        options: {
                            workers: 4
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: './images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './font'
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: true,
            chunks: 'all',
            minSize: 20000, // 20k
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 5,
                    chunks: 'initial'
                },
                vue: {
                    name: 'vue',
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: 10,
                    chunks: 'all'
                },
                elementUI: {
                    name: 'element-ui',
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    priority: 9,
                    chunks: 'all'
                },
                lodash: {
                    name: 'lodash',
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 15,
                    chunks: 'async'
                },
                echarts: {
                    name: 'echarts',
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 20,
                    chunks: 'async'
                },
                axios: {
                    name: 'axios',
                    test: /[\\/]node_modules[\\/]axios[\\/]/,
                    priority: 25,
                    chunks: 'async'
                },
                moment: {
                    name: 'moment',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 30,
                    chunks: 'async'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            title: 'vue',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            filename: 'index.html',
            inject: true,
            chunks: ['element-ui', 'vue', 'vendor', 'main'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.SplitChunksPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[name].css"
        })
    ]
};

if (!isProd) {
    config.devtool = 'source-map';
    config.watch = true;
    config.watchOptions = {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 300
    };
    // config.module.rules.unshift({
    //     test: /.(vue|js|jsx)$/,
    //     use: [{
    //         loader: 'eslint-loader',
    //         options: {
    //             formatter: require('eslint-friendly-formatter')
    //         }
    //     }],
    //     enforce: 'pre',
    //     exclude: /node_modules/,
    //     include: [path.resolve(__dirname, 'src')]
    // });
    config.module.rules.unshift({
        enforce: 'pre',
        test: /\.(js|vue|es6)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
    });
} else {
    config.plugins.push(new CleanWebpackPlugin(['dist']));
    config.plugins.push(new HardSourceWebpackPlugin());
    config.devtool = 'none';
    config.watch = false;
}
if (process.env.analyzer) {
    config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin());
}
module.exports = smp.wrap(config);