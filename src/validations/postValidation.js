const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)
const constants = require('../utils/constants/constants')

const postValidation = {
    create: {
        body: joi
            .object({
                stationId: joi.objectId().required().messages({
                    'string.empty': 'Mã trạm là bắt buộc',
                    'any.required': 'Mã trạm là bắt buộc',
                    'string.pattern.name':
                        'Mã trạm không hợp lệ (phải là MongoDB ObjectId)',
                }),
                name: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Tên trụ là bắt buộc',
                    'string.min': 'Tên trụ phải chứa ít nhất 1 ký tự',
                    'any.required': 'Tên trụ là bắt buộc',
                }),
                power: joi.number().positive().required().messages({
                    'number.base': 'Công suất phải là số',
                    'number.positive': 'Công suất phải lớn hơn 0',
                    'any.required': 'Công suất là bắt buộc',
                }),
                supportBrands: joi
                    .array()
                    .items(
                        joi.string().trim().min(1).required().messages({
                            'string.empty': 'Tên hãng không được để trống',
                            'string.min':
                                'Tên hãng phải chứa ít nhất 1 ký tự hợp lệ',
                            'any.required': 'Tên hãng là bắt buộc',
                        }),
                    )
                    .min(1)
                    .required()
                    .messages({
                        'array.base': 'Danh sách hãng hỗ trợ phải là mảng',
                        'array.min': 'Phải có ít nhất một hãng hỗ trợ',
                        'any.required': 'Danh sách hãng hỗ trợ là bắt buộc',
                        'array.includesRequiredUnknowns':
                            'Tất cả các hãng hỗ trợ phải hợp lệ',
                    }),
                state: joi
                    .string()
                    .valid(...Object.values(constants.STATE_POST))
                    .required()
                    .messages({
                        'any.only':
                            "Trạng thái chỉ bao gồm 'available', 'charging', 'maintenance', 'inactive', 'error'",
                        'any.required': 'Trạng thái là bắt buộc',
                    }),
            })
            .unknown(true),
    },

    update: {
        body: joi
            .object({
                name: joi.string().trim().min(1).required().messages({
                    'string.empty': 'Tên trụ là bắt buộc',
                    'string.min': 'Tên trụ phải chứa ít nhất 1 ký tự',
                    'any.required': 'Tên trụ là bắt buộc',
                }),
                power: joi.number().positive().required().messages({
                    'number.base': 'Công suất phải là số',
                    'number.positive': 'Công suất phải lớn hơn 0',
                    'any.required': 'Công suất là bắt buộc',
                }),
                supportBrands: joi
                    .array()
                    .items(
                        joi.string().trim().min(1).required().messages({
                            'string.empty': 'Tên hãng không được để trống',
                            'string.min':
                                'Tên hãng phải chứa ít nhất 1 ký tự hợp lệ',
                            'any.required': 'Tên hãng là bắt buộc',
                        }),
                    )
                    .min(1)
                    .required()
                    .messages({
                        'array.base': 'Danh sách hãng hỗ trợ phải là mảng',
                        'array.min': 'Phải có ít nhất một hãng hỗ trợ',
                        'any.required': 'Danh sách hãng hỗ trợ là bắt buộc',
                    }),
                state: joi
                    .string()
                    .valid(...Object.values(constants.STATE_POST))
                    .required()
                    .messages({
                        'any.only':
                            "Trạng thái chỉ bao gồm 'available', 'charging', 'maintenance', 'inactive', 'error'",
                        'any.required': 'Trạng thái là bắt buộc',
                    }),
            })
            .unknown(true),
    },
}

module.exports = postValidation
