const stationService = require('../services/stationServices')
const response = require('../utils/response/response')

const stationController = {
    getAll: async (req, res, next) => {
        try {
            const result = await stationService.getAll(req.query)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    getById: async (req, res, next) => {
        try {
            const result = await stationService.getById(req.params.stationId)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    create: async (req, res, next) => {
        try {
            const imagePath = req.file ? `/uploads/${req.file.filename}` : null
            const reqData = {
                ...req.body,
                image: imagePath,
            }
            const result = await stationService.create(reqData)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const imagePath = req.file
                ? `/uploads/${req.file.filename}`
                : undefined
            const reqData = {
                ...req.body,
                ...(imagePath && { image: imagePath }),
            }
            const result = await stationService.update(
                req.params.stationId,
                reqData,
            )
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const result = await stationService.delete(req.params.stationId)
            return res.status(200).json(response.success(result))
        } catch (error) {
            next(error)
        }
    },
}
module.exports = stationController
