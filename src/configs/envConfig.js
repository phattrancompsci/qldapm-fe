const dotenv = require('dotenv')
dotenv.config()

const envConfig = {
    //default
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    SWAGGER_URL: process.env.SWAGGER_URL,
    //db
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_OPTIONS: process.env.DB_OPTIONS,
    //redis
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    //jwt
    JWT_ACCESS_TOKEN_PRIMARY_KEY: process.env.JWT_ACCESS_TOKEN_PRIMARY_KEY,
    JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}

module.exports = envConfig
