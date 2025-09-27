const userService = require('../services/userService')
const response = require('../utils/response/response')

const userController = {
    getInfo: async (req, res, next) => {
        try {
            const userId = req.userId
            const result = await userService.getById(userId)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const userId = req.userId
            const result = await userService.update(userId, req.body)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const userId = req.userId
            const result = await userService.changePassword(userId, req.body)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.userId
            const result = await userService.delete(userId)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
}
module.exports = userController
