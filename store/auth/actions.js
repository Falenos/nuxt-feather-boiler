import { REMOVE_USER, SET_LOGGED_IN, SET_USER } from './mutations'

export default {
    initApiListeners({ commit }) {
        this.$api.service('users').on('patched', (user) => commit(SET_USER, user))
        this.$api.service('users').on('updated', (user) => commit(SET_USER, user))
    },
    async login({ commit }, { email, password }) {
        const { user } = await this.$api.authenticate({
            strategy: 'local',
            email,
            password,
        })
        commit(SET_USER, user)
        commit(SET_LOGGED_IN, true)
    },
    logout({ commit }) {
        this.$api.logout()
        commit(REMOVE_USER)
        commit(SET_LOGGED_IN, false)
    },
    async register({ dispatch }, { name, email, password }) {
        await this.$api.service('users').create({
            name,
            email,
            password,
        })
        await dispatch('login', { email, password })
    },
    async setAmazonCredentials({ commit, state }, { sellerId, mwsAuthToken }) {
        const updatedUser = await this.$api.service('users').patch(state.user._id, {
            sellerId,
            mwsAuthToken,
        })
        commit(SET_USER, updatedUser)
    },
    async setPersonalInformation({ commit, state }, { name, email }) {
        const updatedUser = await this.$api.service('users').patch(state.user._id, {
            name,
            email,
        })
        commit(SET_USER, updatedUser)
    },
}
