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
    }
};
