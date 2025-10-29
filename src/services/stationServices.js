const PostModel = require('../models/post')
const StationModel = require('../models/station')
const constants = require('../utils/constants/constants')
const BadReq = require('../utils/response/badRequest')
const errorData = require('../utils/response/errorData')
const postService = require('./postService')

const stationService = {
    getAll: async (query) => {
        try {
            let { limit = 8, page = 1 } = query
            limit = Number(limit)
            page = Number(page)
            const [items, totalItems] = await Promise.all([
                StationModel.find({})
                    .skip((page - 1) * limit)
                    .limit(limit),
                StationModel.countDocuments({}),
            ])
            return {
                items,
                page,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
            }
        } catch (error) {
            throw error
        }
    },
    getById: async (stationId) => {
        try {
            const result = await StationModel.findById(stationId)
            if (!result) {
                throw new BadReq(errorData.STATION_NOT_FOUND)
            }
            return result
        } catch (error) {
            throw error
        }
    },
    create: async (reqData) => {
        try {
            const { image, city, district, detail } = reqData
            const addressCheck = await StationModel.findOne({
                'address.city': city,
                'address.district': district,
                'address.detail': detail,
            })
            if (addressCheck) {
                throw new BadReq(errorData.ADDRESS_STATION_EXISTED)
            }
            await StationModel.create({
                name: `Trạm sạc ${district}`,
                image,
                address: {
                    city,
                    district,
                    detail,
                },
            })
            return null
        } catch (error) {
            throw error
        }
    },
    update: async (stationId, reqData) => {
        try {
            const station = await StationModel.findById(stationId)
            if (!station) {
                throw new BadReq(errorData.STATION_NOT_FOUND)
            }
            const { image, city, district, detail, state } = reqData
            const addressCheck = await StationModel.findOne({
                'address.city': city,
                'address.district': district,
                'address.detail': detail,
                _id: { $ne: stationId },
            })
            if (addressCheck) {
                throw new BadReq(errorData.ADDRESS_STATION_EXISTED)
            }
            await StationModel.findByIdAndUpdate(stationId, {
                name: `Trạm sạc ${district}`,
                image,
                address: { city, district, detail },
                state,
            })
            return null
        } catch (error) {
            throw error
        }
    },
    delete: async (stationId) => {
        try {
            const station = await StationModel.findById(stationId)
            if (!station) {
                throw new BadReq(errorData.STATION_NOT_FOUND)
            }

            const post = await PostModel.find({ stationId })
            const chargingPost = post.find(
                (p) => p.state === constants.STATE_POST.CHARGING,
            )
            if (chargingPost) {
                throw new BadReq(errorData.POST_CHARGING)
            }
            await Promise.all(post.map((p) => postService.delete(p._id)))

            await StationModel.findByIdAndDelete(stationId)

            return null
        } catch (error) {
            throw error
        }
    },
}
module.exports = stationService
