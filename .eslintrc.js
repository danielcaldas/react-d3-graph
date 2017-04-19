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
        "semi": "error",
        "max-lines": ["error", {"max": 250, "skipComments": true}],
        "max-len": ["error", 120, 4, { "ignoreComments": true }]
    },
    "globals": {
        "document": true,
        "Reflect": true,
        "window": true
    }
};
