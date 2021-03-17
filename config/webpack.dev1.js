const path = require('path');
const paths = require('./paths');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 单独分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 自动添加css前缀
// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const publicPath = '/';
module.exports = {
    mode: 'development',
    output: {
        publicPath: publicPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [paths.appSrc],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        cacheDirectory: true // 缓存
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                include: [paths.appSrc],
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
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
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    /**
     * modules 直接声明依赖名 可简化模块查找，提升构建速度
     * extensions 文件后缀名默认识别
     * alias 配置路径别名
     */
    resolve: {
        modules: ['node_modules', paths.appNodeModules],
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            utils: path.join(__dirname, '..', 'src/utils'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: paths.appHtml, // 配置文件模板
        }),
        new ExtractTextPlugin('index.css'),
    ],
};
