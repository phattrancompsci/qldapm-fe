const redisClient = require('../configs/redisConfig')
const jwt = require('jsonwebtoken')
const response = require('../utils/response/response')
const envConfig = require('../configs/envConfig')

const authenticated = async (req, res, next) => {
    try {
        const baseUrl = req.originalUrl.split('?')[0]
        if (baseUrl.endsWith('login') || baseUrl.endsWith('register')) {
            return next()
        }
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json(response.unauthorized('Không có token'))
        }

        const accessToken = authorization.split(' ')[1]
        let tokenData
        try {
            tokenData = jwt.verify(
                accessToken,
                envConfig.JWT_ACCESS_TOKEN_PRIMARY_KEY,
            )
        } catch (error) {
            return res.status(401).json(response.unauthorized(error.message))
        }

        const token = await redisClient.get(
            `ACCESS_TOKEN_${tokenData.userId}_${tokenData.ts}`,
        )
        if (!token) {
            return res.status(401).json(response.unauthorized('Không có token'))
        }

        req.userId = tokenData.userId
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticated
