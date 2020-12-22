// The correct values will be passed by pm2
// during deployment on the server
const PORT = process.env.PORT
const API_URL = process.env.API_URL

process.env = {
    ...process.env,
    PORT,
    API_URL,
    BASE_URL: `http://localhost:${PORT}/api`,
}
