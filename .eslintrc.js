module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    // add your custom rules here
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
            },
        ],
        indent: ['error', 4],
        semi: ['error', 'never'],
        'linebreak-style': ['error', 'unix'],
    },
}
