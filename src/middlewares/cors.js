const cors = require('cors')
const response = require('../utils/response/response')

const allowedOrigin = [
    'http://localhost:3000',
    'https://qldapm-be.onrender.com',
]

const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true)
        } else {
            callback(response.corsError(), false)
        }
    },
    credentials: true,
})

module.exports = corsMiddleware
