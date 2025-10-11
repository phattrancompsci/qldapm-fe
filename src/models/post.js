const { model, Types, Schema } = require('mongoose')

const postSchema = new Schema(
    {
        stationId: {
            type: Types.ObjectId,
            ref: 'stations',
            required: true,
        },
    },
    { timestamps: true },
)

const PostModel = model('posts', postSchema)
module.exports = PostModel
