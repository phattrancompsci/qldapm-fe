const express = require('express')
const router = express.Router()
const envConfig = require('../configs/envConfig')
const userRouter = require('./user')
const authRouter = require('./auth')

router.use('/user', userRouter)
router.use('/auth', authRouter)

const routeConfig = (app) => {
    app.use(envConfig.BASE_URL, router)
}

module.exports = routeConfig
