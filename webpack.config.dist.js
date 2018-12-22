const path = require("path");
const Visualizer = require("webpack-visualizer-plugin");

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
    plugins: [new Visualizer({ filename: "../gen-docs/stats.html" })],
};
