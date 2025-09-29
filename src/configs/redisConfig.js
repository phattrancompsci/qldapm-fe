const redis = require('redis')
const envConfig = require('./envConfig')

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME } = envConfig
const REDIS_PASSWORD = encodeURIComponent(envConfig.REDIS_PASSWORD)
const client = new redis.createClient({
    url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
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
