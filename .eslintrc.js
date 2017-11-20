module.exports = {
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        "document": true,
        "Reflect": true,
        "window": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "standard",
        "promise",
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "camelcase": "error",
        "keyword-spacing": "error",
        "max-len": ["error", 120, 4, { "ignoreComments": true }],
        "max-lines": ["error", {"max": 400, "skipComments": true}],
        "newline-after-var": ["error", "always"],
        "no-nested-ternary": "error",
        "no-useless-constructor": "error",
        "semi": "error"
    }
};
