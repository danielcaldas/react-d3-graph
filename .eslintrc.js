module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended"
    ],
    "plugins": [
        "standard",
        "promise",
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "camelcase": "error",
        "max-len": ["error", 120, 4, { "ignoreComments": true }],
        "max-lines": ["error", {"max": 250, "skipComments": true}],
        "newline-after-var": ["error", "always"],
        "no-nested-ternary": "error",
        "no-useless-constructor": "error",
        "semi": "error",
        "space-after-keywords": "error"
    },
    "globals": {
        "document": true,
        "Reflect": true,
        "window": true
    }
};
