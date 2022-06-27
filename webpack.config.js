const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './lib/server.js',
    output: {
        filename: 'server.bundle.js',
    },
    externals: [
        nodeExternals()
    ],
};