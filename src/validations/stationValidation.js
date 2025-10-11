const joi = require('joi')
const constants = require('../utils/constants/constants')

const stationValidate = {
    create: {
        body: joi
            .object({
                city: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Tỉnh/Thành phố  là bắt buộc',
                    'string.min': 'Tỉnh/Thành phố  phải chứa ký tự',
                    'string.base': 'Tỉnh/Thành phố  là bắt buộc',
                    'any.required': 'Tỉnh/Thành phố  là bắt buộc',
                }),
                district: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Phường/Xã là bắt buộc',
                    'string.min': 'Phường/Xã phải chứa ký tự',
                    'string.base': 'Phường/Xã là bắt buộc',
                    'any.required': 'Phường/Xã là bắt buộc',
                }),
                detail: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Địa chỉ chi tiết là bắt buộc',
                    'string.min': 'Địa chỉ chi tiết phải chứa ký tự',
                    'string.base': 'Địa chỉ chi tiết là bắt buộc',
                    'any.required': 'Địa chỉ chi tiết là bắt buộc',
                }),
            })
            .unknown(true),
    },
    update: {
        body: joi
            .object({
                city: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Tỉnh/Thành phố  là bắt buộc',
                    'string.min': 'Tỉnh/Thành phố  phải chứa ký tự',
                    'string.base': 'Tỉnh/Thành phố  là bắt buộc',
                    'any.required': 'Tỉnh/Thành phố  là bắt buộc',
                }),
                district: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Phường/Xã là bắt buộc',
                    'string.min': 'Phường/Xã phải chứa ký tự',
                    'string.base': 'Phường/Xã là bắt buộc',
                    'any.required': 'Phường/Xã là bắt buộc',
                }),
                detail: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Địa chỉ chi tiết là bắt buộc',
                    'string.min': 'Địa chỉ chi tiết phải chứa ký tự',
                    'string.base': 'Địa chỉ chi tiết là bắt buộc',
                    'any.required': 'Địa chỉ chi tiết là bắt buộc',
                }),
                state: joi
                    .string()
                    .valid(...Object.values(constants.STATE_STATION))
                    .messages({
                        'any.only':
                            "Trạng thái chỉ bao gồm 'available', 'occupied', 'maintain'",
                    }),
            })
            .unknown(true),
    },
}

module.exports = stationValidate
