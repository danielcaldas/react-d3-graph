module.exports = {
  verbose: true,
  rootDir: ".",
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  transformIgnorePatterns: ["/node_modules/(?!(d3.*|internmap|delaunator|robust-predicates)).+\\.js$"],
};
