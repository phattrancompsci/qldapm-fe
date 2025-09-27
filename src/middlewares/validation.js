const Joi = require('joi')
const BadReq = require('../utils/response/badRequest')
const response = require('../utils/response/response')
const pick = require('../utils/helper/pick')

const validate = (schema) => (req, res, next) => {
    try {
        const validSchema = pick(schema, ['query', 'params', 'body'])
        const object = pick(req, Object.keys(validSchema))

        const { value, error } = Joi.compile(validSchema)
            .prefs({
                errors: { label: 'key' },
                abortEarly: false,
            })
            .validate(object)

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ')
            next(new BadReq({ message: errorMessage }))
        }

        Object.assign(req, value)
        next()
    } catch (error) {
        next(response.serverError(error))
    }
}

module.exports = validate
