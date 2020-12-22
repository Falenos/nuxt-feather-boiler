import { CookieStorage } from 'cookie-storage'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const setupAuth = (feathersApi, app) => {
    // universal storage using cookies
    // in order to have auth working both on server and client
    const serverStorage = {
        getItem(key) {
            return app.$cookies.get(key)
        },
        setItem(key, value) {
            app.$cookies.set(key, value)
        },
        removeItem(key) {
            app.$cookies.remove(key)
        },
    }
    const clientStorage = new CookieStorage()

    feathersApi.configure(
        auth({
            storage: process.isClient ? clientStorage : serverStorage,
            storageKey: 'auth',
        })
    )
}

export default ({ app }, inject) => {
    // Initialize services API connection
    const socket = io(process.env.NUXT_ENV_API_URL)
    const api = feathers()
    api.configure(
        socketio(socket, {
            timeout: 30000,
        })
    )
    setupAuth(api, app)
    inject('api', api)
}
