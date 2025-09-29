const mongoose = require('mongoose')
const envConfig = require('./envConfig')

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_OPTIONS } = envConfig
const DB_PASSWORD = encodeURIComponent(envConfig.DB_PASSWORD)
const ATLAS_DB = envConfig.DB_HOST?.indexOf('mongodb') > 0
const DB_AUTH =
    DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : ''
const connectUri = ATLAS_DB
    ? `mongodb+srv://${DB_AUTH}${DB_HOST}/${DB_NAME}`
    : `mongodb://${DB_AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}?${DB_OPTIONS ?? ''}`
const dbConfig = async () => {
    let reconnectTime
    try {
        await mongoose.connect(connectUri)
        console.log('Connected to DB')
        clearTimeout(reconnectTime)
    } catch (error) {
        console.error('Failed to connect to DB: ', error)
        reconnectTime = setTimeout(() => {
            console.log('Reconnect to mongoDB')
            dbConfig()
        }, 10000)
    }
}

module.exports = dbConfig
