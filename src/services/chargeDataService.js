const { Types } = require('mongoose')
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
            const station = await StationModel.findOne({
                _id: new Types.ObjectId(stationId),
                isActive: true,
            })
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
    getByYear: async (year) => {
        try {
            const numYear = parseInt(year, 10)

            const data = await ChargeDataModel.aggregate([
                {
                    $match: {
                        startTime: {
                            $gte: new Date(numYear, 0, 1),
                            $lt: new Date(numYear + 1, 0, 1),
                        },
                    },
                },
                {
                    $group: {
                        _id: { month: { $month: '$startTime' } },
                        count: { $sum: 1 },
                        items: { $push: '$$ROOT' },
                    },
                },
                { $sort: { '_id.month': 1 } },
            ])
            data.forEach((d) => {
                d['totalElectric'] = d.items.reduce((acc, cur) => {
                    return (acc += cur.electricalConsumption)
                }, 0)
            })

            const result = { year }
            for (let i = 1; i <= 12; ++i) {
                result[i] = {}
            }

            data.forEach((d) => {
                const electric = d.items.reduce((acc, cur) => {
                    return (acc += cur.electricalConsumption)
                }, 0)
                result[d._id.month] = {
                    revenue: electric * 7600,
                    quantity: d.count,
                    electric,
                }
            })

            return result
        } catch (error) {
            throw error
        }
    },
    getAll: async (query) => {
        let { page = 1, limit = 10 } = query
        page = Number(page)
        limit = Number(limit)

        const [items, totalItems] = await Promise.all([
            ChargeDataModel.find({})
                .select('-createdAt -updatedAt -__v')
                .sort({ startTime: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('stationId', 'name')
                .populate('postId', 'name'),
            ChargeDataModel.countDocuments({}),
        ])

        const result = items.map((i) => ({
            _id: i._id,
            vehicleType: i.carType,
            timeStart: new Date(i.startTime).toLocaleString('vi-VN'),
            duration: i.chargeTime,
            electric: i.electricalConsumption,
            station: i.stationId.name,
            charger: i.postId.name,
        }))

        return {
            result,
            page,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        }
    },
}

module.exports = chargeDataService
