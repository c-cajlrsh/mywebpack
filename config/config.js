module.exports = {
    dev: {
        server: {
            host: 'localhost',
            port: 8080,
            autoOpenBrowser: true // 自动打开浏览器
        },
        devtool: 'cheap-module-eval-source-map',// cheap-module-eval-source-map
        notifyOnErrors: true, // 错误提示
        cssModules: true, // css模块化
        proxy: {
            '/api': {
                // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
                target: "http://localhost:3000",
                // 把 URL 中 path 部分的 `api` 移除掉
                pathRewrite: {'^/api': ''},
            },
        }
    },
    build: {
        devtool: 'cheap-module-source-map',
    }
};
