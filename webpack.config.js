const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'sandbox'),
    devtool: 'source-map',
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'rd3g.sandbox.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    plugins: []
};
