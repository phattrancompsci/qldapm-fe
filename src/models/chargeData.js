const { model, Schema, Types } = require('mongoose')
const constants = require('../utils/constants/constants')

const chargeDataSchema = new Schema(
    {
        customerId: {
            type: String,
            required: true,
        },
        stationId: {
            type: Types.ObjectId,
            required: true,
            ref: 'stations',
        },
        postId: {
            type: Types.ObjectId,
            required: true,
            ref: 'posts',
        },
        carType: {
            type: String,
            enum: Object.values(constants.CAR_BRANDS),
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        chargeTime: {
            type: Number,
            required: true,
        },
        electricalConsumption: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const ChargeDataModel = model('chargeData', chargeDataSchema)
module.exports = ChargeDataModel
