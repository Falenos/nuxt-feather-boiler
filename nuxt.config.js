import colors from 'vuetify/es5/util/colors'
if (process.env.NODE_ENV === 'production') {
    require('./config.production')
    // variables starting with NUXT_ENV_ will be injected to the client side
    process.env.NUXT_ENV_API_URL = process.env.API_URL
} else {
    require('./config.development')
    process.env.NUXT_ENV_API_URL = process.env.API_URL
}

export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    server: {
        port: process.env.PORT,
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - client',
        title: 'client',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        {
            src: '~/plugins/feathers-client',
            mode: 'all',
        },
        {
            src: '~/plugins/api-listeners',
            mode: 'client',
        },
        {
            src: '~/plugins/ensure-auth',
            mode: 'client',
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
    ],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        prefix: '/api/',
        baseURL: `${process.env.BASE_URL}/api/`,
        proxy: true,
    },
    proxy: {
        '/api/**': {
            target: process.env.API_URL,
            pathRewrite: { '^/api/': '' },
        },
    },

    // Content module configuration (https://go.nuxtjs.dev/config-content)
    content: {},

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        analyze: false,
        transpile: ['feathers-custom-methods'],
        babel: {
            plugins: ['@babel/plugin-proposal-optional-chaining'],
        },
        extend(config, { isClient }) {
            if (isClient) {
                config.node = {
                    http: 'empty',
                    fs: 'empty',
                    child_process: 'empty',
                    net: 'empty',
                    tls: 'empty',
                }
            }
        },
    },
}
