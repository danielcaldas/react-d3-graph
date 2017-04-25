const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'rd3g.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|sandbox/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs'],
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
};
