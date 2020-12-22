export default function ({ store, redirect }) {
    // If the user is not authenticated redirect him/her to login page
    if (!store.state.auth.loggedIn) {
        return redirect('/login')
    }
}
