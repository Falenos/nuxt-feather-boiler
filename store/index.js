import { SET_LOGGED_IN, SET_USER } from './auth/mutations'

export default {
    actions: {
        // the below code will run during the initiation of nuxt server.
        // we ensure that any requests happening during SSR will be from the authenticated user.
        async nuxtServerInit({ commit }, { $api }) {
            try {
                const { user } = await $api.reAuthenticate()
                commit(`auth/${SET_USER}`, user)
                commit(`auth/${SET_LOGGED_IN}`, true)
            } catch (error) {}
        },
    },
}
