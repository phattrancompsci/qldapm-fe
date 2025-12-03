const { Types } = require('mongoose')
const BadReq = require('../utils/response/badRequest')
const errorData = require('../utils/response/errorData')
const PostModel = require('../models/post')
const StationModel = require('../models/station')
const constants = require('../utils/constants/constants')

const postService = {
    create: async (reqData) => {
        try {
            const { stationId, name, power, supportBrands, state } = reqData
            const checkStation = await StationModel.findOne({
                _id: new Types.ObjectId(stationId),
                isActive: true,
            })
            if (!checkStation) {
                throw new BadReq(errorData.STATION_NOT_FOUND)
            }
            const checkName = await PostModel.findOne({ name, stationId })
            if (checkName) {
                throw new BadReq(errorData.POST_NAME_EXISTED)
            }
            await PostModel.create({
                stationId,
                name,
                power,
                supportBrands,
                state,
            })
            return null
        } catch (error) {
            throw error
        }
    },
    getAll: async (query) => {
        try {
            const { stationId } = query
            let { limit = 10, page = 1 } = query
            limit = Number(limit)
            page = Number(page)
            const checkStation = await StationModel.findOne({
                _id: new Types.ObjectId(stationId),
                isActive: true,
            })
            if (!checkStation) {
                throw new BadReq(errorData.STATION_NOT_FOUND)
            }

            const [posts, totalPost] = await Promise.all([
                PostModel.find({ stationId })
                    .skip((page - 1) * limit)
                    .limit(limit),
                PostModel.countDocuments({ stationId }),
            ])

            return {
                posts,
                totalPost,
                totalPages: Math.ceil(totalPost / limit),
                page,
            }
        } catch (error) {
            throw error
        }
    },

    getById: async (postId) => {
        try {
            const post = await PostModel.findById(postId)
            if (!post) {
                throw new BadReq(errorData.POST_NOT_FOUND)
            }
            return post
        } catch (error) {
            throw error
        }
    },

    update: async (postId, reqData) => {
        try {
            const post = await PostModel.findById(postId)
            if (!post) {
                throw new BadReq(errorData.POST_NOT_FOUND)
            }
            const { name, power, supportBrands, state } = reqData
            const checkName = await PostModel.findOne({
                name,
                stationId: post.stationId,
                _id: { $ne: post._id },
            })
            if (checkName) {
                throw new BadReq(errorData.POST_NAME_EXISTED)
            }
            if (
                post.state === constants.STATE_POST.CHARGING &&
                (post.name !== name ||
                    post.power !== power ||
                    JSON.stringify(post.supportBrands) !==
                        JSON.stringify(supportBrands))
            ) {
                throw new BadReq(errorData.POST_CHARGING)
            }
            await PostModel.findByIdAndUpdate(postId, {
                name,
                power,
                supportBrands,
                state,
            })
            return null
        } catch (error) {
            throw error
        }
    },

    delete: async (postId) => {
        try {
            const post = await PostModel.findById(postId)
            if (!post) {
                throw new BadReq(errorData.POST_NOT_FOUND)
            }
            if (post.state === constants.STATE_POST.CHARGING) {
                throw new BadReq(errorData.POST_CHARGING)
            }
            await PostModel.findByIdAndDelete(postId)
            return null
        } catch (error) {
            throw error
        }
    },
}
module.exports = postService
