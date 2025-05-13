const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};