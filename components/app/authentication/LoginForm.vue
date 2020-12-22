<template>
    <v-form v-model="valid" @submit.prevent="submitForm(userInfo)">
        <v-text-field
            v-model="userInfo.email"
            label="Email"
            :autofocus="true"
            :rules="[required('email'), emailFormat()]"
            data-test="email"
            autocomplete="email"
        />
        <v-text-field
            v-model="userInfo.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            counter="true"
            :rules="[required('password'), minLength('password', 5)]"
            data-test="password"
            autocomplete="current-password"
            @click:append="showPassword = !showPassword"
        />
        <v-btn type="submit" :loading="loading" :disabled="!valid" data-test="loginBtn"> LOGIN </v-btn>
    </v-form>
</template>

<script>
import validations from '@/utils/validations'
export default {
    props: {
        loading: {
            type: Boolean,
        },
        submitForm: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            valid: false,
            showPassword: false,
            userInfo: {
                email: '',
                password: '',
            },
            ...validations,
        }
    },
}
</script>
