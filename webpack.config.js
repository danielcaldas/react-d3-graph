var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

// https://medium.freecodecamp.com/tree-shaking-es6-modules-in-webpack-2-1add6672f31b
// http://moduscreate.com/optimizing-react-es6-webpack-production-build/

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: debug ? 'source-map' : null,
    entry: './js/app.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'rd3g.bundle.js'
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
    plugins: debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
