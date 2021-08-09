module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
