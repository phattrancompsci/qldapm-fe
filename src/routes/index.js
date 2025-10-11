const express = require('express')
const path = require('path')
const router = express.Router()
const envConfig = require('../configs/envConfig')
const userRouter = require('./user')
const authRouter = require('./auth')
const stationRouter = require('./station')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/station', stationRouter)

const routeConfig = (app) => {
    app.use(envConfig.BASE_URL, router)
}

module.exports = routeConfig
