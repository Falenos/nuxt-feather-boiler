// You can change port if 3000 is occupied
const PORT = '3000'
// This is the url that our backend runs
// It could also point to the remote server
const API_URL = 'http://localhost:3030'

process.env = {
    ...process.env,
    PORT,
    API_URL,
    BASE_URL: `http://localhost:${PORT}/`,
}
