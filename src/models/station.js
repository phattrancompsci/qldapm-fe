const { model, Schema } = require('mongoose')
const constants = require('../utils/constants/constants')

const addressSchema = new Schema(
    {
        detail: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    { _id: false },
)

const stationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        address: {
            type: addressSchema,
            required: true,
        },
        state: {
            type: String,
            enum: Object.values(constants.STATE_STATION),
            default: constants.STATE_STATION.AVAILABLE,
        },
    },
    { timestamps: true },
)

const StationModel = model('stations', stationSchema)
module.exports = StationModel
