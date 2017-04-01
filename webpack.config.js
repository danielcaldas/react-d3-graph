var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

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
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', [ 'es2015', { modules: false } ], 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: debug ? [] : [
        new HtmlWebpackPlugin({ title: 'Tree-shaking' }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
