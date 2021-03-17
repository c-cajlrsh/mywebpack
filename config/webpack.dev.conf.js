const path = require('path');
const paths = require('./paths');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 友好的webpack错误提示
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 合并webpack配置文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: paths.appHtml, // 配置文件模板
            inject: true
        }),
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
        // hot: true, // 热替换 4.x 默认开启
        clientLogLevel: 'warning', // 消息提示级别
        compress: true,
        open: config.dev.server.autoOpenBrowser, // 自动打开浏览器
        quiet: true, // 错误和警告都不显示
        watchContentBase: true,
        publicPath: paths.publicPath,
        // 静态文件存放内容
        contentBase: path.join(__dirname, '..', 'public'),
    }
});
