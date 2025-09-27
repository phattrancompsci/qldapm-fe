const redis = require('redis')
const envConfig = require('./envConfig')

const client = new redis.createClient({
    url: `redis://${envConfig.REDIS_USERNAME}:${envConfig.REDIS_PASSWORD}@${envConfig.REDIS_HOST}:${envConfig.REDIS_PORT}`,
})
client.on('connect', () => console.log('Redis connected'))
client.on('ready', () => console.log('Redis ready'))
client.on('reconnecting', () => console.log('Redis reconnecting'))
client.on('error', () => console.log('Redis error'))

const redisConfig = async () => {
    await client.connect()
}

redisConfig()

module.exports = client
