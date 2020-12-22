<template>
    <v-container>
        <v-row align="center" justify="center" class="mt-12">
            <v-col md="8" lg="6" xl="4">
                <register-form :submit-form="registerUser" :loading="loading" />
                <v-alert v-show="registerError" outlined type="error" class="mt-10">
                    {{ errorMessage }}
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RegisterForm from '@/components/app/authentication/RegisterForm'

export default {
    components: {
        RegisterForm,
    },
    fetch() {
        if (this.loggedIn) {
            this.goToHomePage()
        }
    },
    data() {
        return {
            loading: false,
            registerError: null,
        }
    },
    computed: {
        ...mapState('auth', ['loggedIn']),
        errorMessage() {
            if (this.registerError?.className === 'conflict') {
                return 'A user with this email already exists'
            }
            return 'Something went wrong, please try again.'
        },
    },
    methods: {
        ...mapActions('auth', {
            registerAction: 'register',
        }),
        goToHomePage() {
            this.$nuxt.context.redirect('/')
        },
        async registerUser(registrationInfo) {
            this.loading = true
            try {
                await this.registerAction(registrationInfo)
                this.goToHomePage()
            } catch (err) {
                this.registerError = err
            }
            this.loading = false
        },
    },
}
</script>
