const path = require("path");
const Visualizer = require("webpack-visualizer-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./index.js",
    output: {
        path: __dirname + "/dist/",
        filename: "rd3g.bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|sandbox/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015", "stage-2"],
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "../gen-docs/bundle-analyser-stats.html",
            openAnalyzer: true,
        }),
        new Visualizer({ filename: "../gen-docs/visualizer-stats.html" }),
    ],
};
