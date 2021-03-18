const path = require('path');
const paths = require('./paths');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 单独分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 自动添加css前缀
const autoprefixer = require('autoprefixer');
// 删除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        index: paths.appIndex,
        vendor: ["react", "lodash"], // 指定公共使用的第三方类库
    },
    output: {
        publicPath: paths.publicPath,
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称...
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: [paths.appSrc],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true, // 使用 css 的压缩功能
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/img/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    }
                ]
            },
        ]
    },
    /**
     * modules 直接指定路径，不做过多查询 可简化模块查找，提升构建速度
     * extensions 文件后缀名默认识别
     * alias 配置路径别名
     * mainFiles 默认文件
     */
    // 代码分离
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor", // 使用 vendor 入口作为公共部分
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        // 打包前先删除文件
        new CleanWebpackPlugin(
            [paths.dist],　 //匹配删除的文件
            {
                root: paths.root,
                verbose: true,
                dry: false
            }
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: paths.appHtml, // 配置文件模板
            minify: { // 压缩 HTML 的配置
                minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
                minifyJS: true, // 压缩 HTML 中出现的 JS 代码
                removeComments: true, // 删除注释
                collapseWhitespace: true, // 去除空格
                removeAttributeQuotes: true //
            }
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
            allChunks: true
        }),
    ],
});
