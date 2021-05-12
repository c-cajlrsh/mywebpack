const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动添加css前缀
const autoprefixer = require('autoprefixer');
// 单独分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 友好的webpack错误提示
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 合并webpack配置文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');
const utils = require('./utils');
module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: config.dev.devtool, // soureMap
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                // exclude: [path.join(__dirname, '..', 'src', 'assets')],
                exclude: [paths.cssModules],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                modules: config.dev.cssModules,
                                localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                        'less-loader',
                    ],
                }),
            },
            {
                test: /\.(css|less)$/,
                // include: [path.join(__dirname, '..', 'src', 'assets')],
                include: [paths.cssModules],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                        'less-loader',
                    ],
                }),
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: paths.appHtml, // 配置文件模板
            inject: true
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(), // 模块热替换
        new webpack.NamedModulesPlugin(), // 显示模块正确的相对路径
        new FriendlyErrorsPlugin({ // 友好的错误提示
            compilationSuccessInfo: {
                messages: [`http://${config.dev.server.host}:${config.dev.server.port}`]
            },
            onErrors: config.dev.notifyOnErrors
                ? utils.createNotifierCallback()
                : undefined
        })
    ],
    devServer: {
        host: config.dev.server.host, // 默认
        port: config.dev.server.port,
        hot: true, // 模块热替换
        clientLogLevel: 'warning', // 消息提示级别
        compress: true,
        open: config.dev.server.autoOpenBrowser, // 自动打开浏览器
        quiet: true, // 错误和警告都不显示
        watchContentBase: true,
        publicPath: paths.publicPath,
        // 静态文件存放内容
        contentBase: path.join(__dirname, '..', 'public'),
        proxy: config.dev.proxy,
        historyApiFallback: true
    }
});
