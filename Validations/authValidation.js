const joi = require('joi')

exports.loinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})