import * as endpoints from '@/constants/endpoints'

export default {
    async login({ email, password }) {
        await this.$auth.loginWith('local', {
            data: {
                email,
                password,
            },
        })
        this.$auth.setUser({ email })
    },
    async register({ dispatch }, { name, email, password }) {
        await this.$axios.post(endpoints.REGISTER, { name, email, password })

        await dispatch('login', { email, password })
    },
}
