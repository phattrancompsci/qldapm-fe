const chargeDataService = require('../services/chargeDataService')
const response = require('../utils/response/response')
const chargeDataController = {
    create: async (req, res, next) => {
        try {
            const result = await chargeDataService.create(req.body)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    getByYear: async (req, res, next) => {
        try {
            const result = await chargeDataService.getByYear(req.params.year)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const result = await chargeDataService.getAll(req.query)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
}
module.exports = chargeDataController
