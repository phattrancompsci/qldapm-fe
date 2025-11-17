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
}
module.exports = chargeDataController
