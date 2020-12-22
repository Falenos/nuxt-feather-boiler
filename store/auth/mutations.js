export const SET_USER = 'SET_USER'
export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const REMOVE_USER = 'REMOVE_USER'

export default {
    [SET_USER](state, userData) {
        state.user = {
            ...state.user,
            ...userData,
        }
    },
    [REMOVE_USER](state) {
        state.user = {}
    },
    [SET_LOGGED_IN](state, loggedIn) {
        state.loggedIn = loggedIn
    },
}
