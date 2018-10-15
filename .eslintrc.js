module.exports = {
    extends: ['eslint:recommended', 'plugin:jest/recommended'],
    globals: {
        document: true,
        Reflect: true,
        window: true,
        Cypress: true,
        cy: true,
        module: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['standard', 'promise', 'react', 'jest', 'cypress'],
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        camelcase: 'error',
        'keyword-spacing': 'error',
        'max-len': ['error', 120, 4, { ignoreComments: true }],
        'max-lines': ['error', { max: 400, skipComments: true }],
        'newline-after-var': ['error', 'always'],
        'no-nested-ternary': 'error',
        'no-useless-constructor': 'error',
        semi: 'error',
        'require-jsdoc': 'error',
        'valid-jsdoc': [
            'error',
            {
                prefer: {
                    arg: 'param',
                    argument: 'param',
                    class: 'constructor',
                    return: 'returns',
                    virtual: 'abstract'
                },
                preferType: {
                    Boolean: 'boolean',
                    Number: 'number',
                    object: 'Object',
                    String: 'string',
                    Function: 'Function'
                },
                requireReturn: true,
                requireReturnType: true
            }
        ]
    }
};
