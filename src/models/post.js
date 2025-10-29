const { model, Types, Schema } = require('mongoose')
const constants = require('../utils/constants/constants')

const postSchema = new Schema(
    {
        stationId: {
            type: Types.ObjectId,
            ref: 'stations',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        power: {
            type: Number,
            required: true,
        },
        supportBrands: {
            type: [String],
            default: [],
        },
        state: {
            type: String,
            enum: Object.values(constants.STATE_POST),
            required: true,
        },
    },
    { timestamps: true },
)

const PostModel = model('posts', postSchema)
module.exports = PostModel
