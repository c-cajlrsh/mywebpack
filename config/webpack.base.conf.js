const path = require('path');
const paths = require('./paths');
module.exports = {
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
            'utils': path.join(__dirname, '..', 'src/utils'),
            'assets': path.join(__dirname, '..', 'src/assets'),
            'base': path.join(__dirname, '..', 'src/base'),
            'common': path.join(__dirname, '..', 'src/common'),
            'components': path.join(__dirname, '..', 'src/components'),
            'api': path.join(__dirname, '..', 'src/api'),
            'router': path.join(__dirname, '..', 'src/router')
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
