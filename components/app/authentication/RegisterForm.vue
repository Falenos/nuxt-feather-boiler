<template>
    <v-form v-model="valid" @submit.prevent="submitForm(userInfo)">
        <v-text-field
            v-model="userInfo.name"
            label="Name"
            :autofocus="true"
            :rules="[required('name')]"
            autocomplete="name"
        />

        <v-text-field
            v-model="userInfo.email"
            label="Email"
            :rules="[required('email'), emailFormat()]"
            autocomplete="email"
        />

        <v-text-field
            v-model="userInfo.password"
            label="Password"
            autocomplete="new-password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            counter="true"
            :rules="[required('password'), minLength('password', 5)]"
            @click:append="showPassword = !showPassword"
        />

        <v-btn type="submit" :loading="loading" :disabled="!valid">REGISTER</v-btn>
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
                name: '',
                email: '',
                password: '',
            },
            ...validations,
        }
    },
}
</script>
