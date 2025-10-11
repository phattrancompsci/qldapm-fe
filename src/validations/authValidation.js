const joi = require('joi')

const authValidation = {
    login: {
        body: joi
            .object({
                email: joi
                    .string()
                    .email({ tlds: { allow: false } })
                    .required()
                    .messages({
                        'string.empty': 'Email là bắt buộc',
                        'string.email': 'Email không đúng định dạng',
                        'any.required': 'Email là bắt buộc',
                    }),
                password: joi
                    .string()
                    .pattern(
                        /^(?=(.*[a-z]))(?=.*[A-Z])(?=(.*\d))(?=(.*[\W_])).{6,30}$/,
                    )
                    .required()
                    .messages({
                        'string.empty': 'Mật khẩu là bắt buộc',
                        'string.pattern.base':
                            'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số, 1 ký tự đặc biệt và dài từ 6 đến 30 ký tự',
                        'any.required': 'Mật khẩu là bắt buộc',
                    }),
            })
            .unknown(true),
    },
    register: {
        body: joi
            .object({
                email: joi
                    .string()
                    .email({ tlds: { allow: false } })
                    .required()
                    .messages({
                        'string.empty': 'Email là bắt buộc',
                        'string.email': 'Email không đúng định dạng',
                        'any.required': 'Email là bắt buộc',
                    }),
                phone: joi
                    .string()
                    .pattern(/^[0-9]{4,15}$/)
                    .required()
                    .messages({
                        'string.empty': 'Số điện thoại là bắt buộc',
                        'string.pattern.base':
                            'Số điện thoại phải có từ 4 đến 15 chữ số',
                        'any.required': 'Số điện thoại là bắt buộc',
                    }),
                fullName: joi
                    .string()
                    .trim()
                    .min(2)
                    .max(100)
                    .pattern(/^[a-zA-ZÀ-ỹ\s']+$/u)
                    .required()
                    .messages({
                        'string.empty': 'Họ tên là bắt buộc',
                        'string.min': 'Họ tên phải có ít nhất 2 ký tự',
                        'string.max': 'Họ tên không được vượt quá 100 ký tự',
                        'string.pattern.base':
                            'Họ tên chỉ được chứa chữ cái và khoảng trắng',
                        'any.required': 'Họ tên là bắt buộc',
                    }),
                password: joi
                    .string()
                    .pattern(
                        /^(?=(.*[a-z]))(?=.*[A-Z])(?=(.*\d))(?=(.*[\W_])).{6,30}$/,
                    )
                    .required()
                    .messages({
                        'string.empty': 'Mật khẩu là bắt buộc',
                        'string.pattern.base':
                            'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số, 1 ký tự đặc biệt và dài từ 6 đến 30 ký tự',
                        'any.required': 'Mật khẩu là bắt buộc',
                    }),
            })
            .unknown(true),
    },
}

module.exports = authValidation
