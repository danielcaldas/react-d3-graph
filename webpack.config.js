const dev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

// https://medium.freecodecamp.com/tree-shaking-es6-modules-in-webpack-2-1add6672f31b
// http://moduscreate.com/optimizing-react-es6-webpack-production-build/
console.log('Environment', dev);
const dir = dev ? 'sandbox' : 'src';
const excludeDir = dev ? /node_modules/ : /node_modules|sandbox/;

module.exports = {
    context: path.join(__dirname, dir),
    devtool: dev ? 'source-map' : null,
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'rd3g.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: excludeDir,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    plugins: dev ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
