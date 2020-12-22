<template>
    <v-container>
        <v-row align="center" justify="center" class="mt-12">
            <v-col md="8" lg="6" xl="4">
                <login-form :submit-form="loginUser" :loading="loading" />
                <v-alert v-show="loginError" outlined type="error" class="mt-10">
                    Incorrect username or password.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '@/components/app/authentication/LoginForm'

export default {
    components: {
        LoginForm,
    },
    fetch() {
        if (this.loggedIn) {
            this.goToHomePage()
        }
    },
    data() {
        return {
            loginError: false,
            loading: false,
        }
    },
    computed: {
        ...mapState('auth', ['loggedIn']),
    },
    methods: {
        ...mapActions('auth', {
            loginAction: 'login',
        }),
        goToHomePage() {
            this.$nuxt.context.redirect('/')
        },
        async loginUser({ email, password }) {
            this.loading = true
            try {
                await this.loginAction({ email, password })
                this.goToHomePage()
            } catch (error) {
                this.loginError = true
            }
            this.loading = false
        },
    },
}
</script>
