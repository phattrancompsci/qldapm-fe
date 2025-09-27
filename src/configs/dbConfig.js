const mongoose = require('mongoose')
const envConfig = require('./envConfig')

const dbConfig = async () => {
    try {
        await mongoose.connect(
            `mongodb://${envConfig.DB_USERNAME}:${envConfig.DB_PASSWORD}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/evStation?replicaSet=rs0&authSource=admin`,
        )
        console.log('Connected to DB')
    } catch (error) {
        console.error('Failed to connect to DB')
    }
}

module.exports = dbConfig
