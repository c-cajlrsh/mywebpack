const path = require('path');
const fs = require('fs');
const url = require('url');

/**
 * process.cwd() 项目的当前目录 即node运行环境目录
 * fs.realpathSync() 返回解析的路径
 */
const appDirectory = fs.realpathSync(process.cwd()); // 项目的当前目录
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    root: resolveApp('/'), // 根目录
    appHtml: resolveApp('public/index.html'), // html 模板的存放路径
    appNodeModules: resolveApp('node_modules'), // 模块文件目录
    appSrc: resolveApp('src'), // 项目开发目录
    cssModules: path.resolve(appDirectory, 'src', 'assets'),
    appIndex: resolveApp('src/index.js'), // 打包入口
    dist: resolveApp('dist'), // 打包出口文件
    publicPath: '/' // 资源文件路径
};
