const UserModel = require('../models/user')
const BadReq = require('../utils/response/badRequest')
const errorData = require('../utils/response/errorData')
const bcrypt = require('bcrypt')

const userServices = {
    getById: async (userId) => {
        try {
            const user = await UserModel.findById(userId, {
                password: 0,
                __v: 0,
            }).lean()
            if (!user) {
                throw new BadReq(errorData.USER_NOT_FOUND)
            }
            return user
        } catch (error) {
            throw error
        }
    },
    update: async (userId, reqData) => {
        try {
            const user = await UserModel.findById(userId)
            if (!user) {
                throw new BadReq(errorData.USER_NOT_FOUND)
            }

            const { phone, email, fullName } = reqData
            const checkEmail = await UserModel.findOne({ email })
            if (checkEmail) {
                throw new BadReq(errorData.EMAIL_EXISTED)
            }
            const checkPhone = await UserModel.findOne({ phone })
            if (checkPhone) {
                throw new BadReq(errorData.PHONE_EXISTED)
            }

            await UserModel.findByIdAndUpdate(userId, {
                phone,
                email,
                fullName,
            })
            return null
        } catch (error) {
            throw error
        }
    },
    changePassword: async (userId, reqData) => {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw new BadReq(errorData.USER_NOT_FOUND)
        }
        const { oldPassword, newPassword } = reqData
        const checkPassword = await bcrypt.compare(oldPassword, user.password)
        if (!checkPassword) {
            throw new BadReq(errorData.WRONG_PASSWORD)
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)

        await UserModel.findByIdAndUpdate(userId, { password: hashPassword })
        return null
    },
    delete: async (userId) => {
        try {
            const user = await UserModel.findById(userId)
            if (!user) {
                throw new BadReq(errorData.USER_NOT_FOUND)
            }
            await UserModel.findByIdAndDelete(userId)
            return null
        } catch (error) {
            throw error
        }
    },
}
module.exports = userServices
