const joi = require('joi')
exports.createOrderSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().required(),
    items: joi.array().items(
        joi.object({
            product: joi.string().required(),
            quantity: joi.number().positive().required(),
        })
    ).required().min(1),
})