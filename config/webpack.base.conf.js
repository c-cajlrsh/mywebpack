const path = require('path');
const paths = require('./paths');
// 自动添加css前缀
const autoprefixer = require('autoprefixer');
module.exports = {
    mode: 'development',
    output: {
        publicPath: paths.publicPath,
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [paths.appSrc],
                use: {loader: 'babel-loader',}
            },
            {
                test: /\.(css|less)$/,
                include: [paths.appSrc],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
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
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]',
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]',
                }
            },
        ]
    },
};
