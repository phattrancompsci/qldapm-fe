const UserModel = require('../models/user')
const BadReq = require('../utils/response/badRequest')
const errorData = require('../utils/response/errorData')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const envConfig = require('../configs/envConfig')
const redisClient = require('../configs/redisConfig')


const authService = {
    login: async (reqData) => {
        try {
            const { username, password } = reqData

            const user = await UserModel.findOne({ username })
            if (!user) {
                throw new BadReq(errorData.USERNAME_NOT_FOUNDED)
            }

            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                throw new BadReq(errorData.WRONG_PASSWORD)
            }

            const ts = Date.now()
            const accessToken = jwt.sign(
                { userId: user._id, ts },
                envConfig.JWT_ACCESS_TOKEN_PRIMARY_KEY,
                { expiresIn: Number(envConfig.JWT_ACCESS_TOKEN_EXPIRES) },
            )

            await redisClient.set(
                `ACCESS_TOKEN_${user._id}_${ts}`,
                accessToken,
                { EX: envConfig.JWT_ACCESS_TOKEN_EXPIRES },
            )

            return accessToken
        } catch (error) {
            throw error
        }
    },
    logout: async (token) => {
        try {
            const tokenData = jwt.verify(
                token,
                envConfig.JWT_ACCESS_TOKEN_PRIMARY_KEY,
            )
            await redisClient.del(
                `ACCESS_TOKEN_${tokenData.userId}_${tokenData.ts}`,
            )
            return null
        } catch (error) {
            throw error
        }
    },
    register: async (reqData) => {
        try {
            const { username, password, fullName, email, phone } = reqData

            const checkUser = await UserModel.findOne({ username })
            if (checkUser) {
                throw new BadReq(errorData.USERNAME_EXISTED)
            }
            const checkEmail = await UserModel.findOne({ email })
            if (checkEmail) {
                throw new BadReq(errorData.EMAIL_EXISTED)
            }
            const checkPhone = await UserModel.findOne({ phone })
            if (checkPhone) {
                throw new BadReq(errorData.PHONE_EXISTED)
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            await UserModel.create({
                username,
                password: hashedPassword,
                fullName,
                email,
                phone,
            })

            return null
        } catch (error) {
            throw error
        }
    },
}
module.exports = authService
