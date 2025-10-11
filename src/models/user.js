const { model, Schema } = require('mongoose')

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const UserModel = model('users', userSchema)
module.exports = UserModel
