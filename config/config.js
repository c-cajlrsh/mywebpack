module.exports = {
    dev: {
        server: {
            host: 'localhost',
            port: 8080,
            autoOpenBrowser: true
        },
        devtool: 'cheap-module-eval-source-map',
        cssSourceMap: true,
        notifyOnErrors: true, // 错误提示
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

    }
};
