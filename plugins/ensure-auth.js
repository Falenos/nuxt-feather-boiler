// this plugin is intended to run only in the client
// in order to ensure an authenticated websocket
export default async ({ $api }) => {
    try {
        await $api.reAuthenticate()
    } catch (error) {
        // eslint-disable-next-line
        console.error(error)
    }
}
