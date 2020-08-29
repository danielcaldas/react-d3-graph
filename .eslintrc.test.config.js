module.exports = {
  extends: ["plugin:jest/recommended"],
  globals: {
    document: true,
    Reflect: true,
    window: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["standard", "promise", "react", "jest"],
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error",
    "max-len": ["error", 180, 4, { ignoreComments: true }],
    "max-lines": ["error", { max: 800, skipComments: true }],
    quotes: ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
  },
  env: {
    "jest/globals": true,
  },
};
