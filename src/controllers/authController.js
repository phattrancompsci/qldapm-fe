const authService = require('../services/authServices')
const response = require('../utils/response/response')

const authController = {
    login: async (req, res, next) => {
        try {
            const result = await authService.login(req.body)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const result = await authService.logout(token)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    register: async (req, res, next) => {
        try {
            const result = await authService.register(req.body)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
}
module.exports = authController
