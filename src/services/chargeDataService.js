const ChargeDataModel = require('../models/chargeData')
const StationModel = require('../models/station')
const PostModel = require('../models/post')
const BadReq = require('../utils/response/badRequest')
const errorCode = require('../utils/response/errorData')

const chargeDataService = {
    create: async (reqData) => {
        try {
            const {
                customerId,
                stationId,
                postId,
                carType,
                startTime,
                chargeTime,
                electricalConsumption,
            } = reqData
            const station = await StationModel.findById(stationId)
            if (!station) {
                throw new BadReq(errorCode.STATION_NOT_FOUND)
            }
            const post = await PostModel.findById(postId)
            if (!post) {
                throw new BadReq(errorCode.POST_NOT_FOUND)
            }
            await ChargeDataModel.create({
                customerId,
                stationId,
                postId,
                carType,
                startTime,
                chargeTime,
                electricalConsumption,
            })
            return null
        } catch (error) {
            throw error
        }
    },
}

module.exports = chargeDataService
