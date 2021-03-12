const serve = require('webpack-serve');
const config = require('./webpack.dev1.js');

serve({
    config,
}).then((server) => {
    server.on('listening', () => {
        console.log('happy fun time');
    });
});