import Joi from "joi";

function userValidation(data) {
    const userSchema = Joi.object({
        fullname: Joi.string().min(5).required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string(),
        regionId: Joi.number(),
    })
    return userSchema.validate(data)
}

function userValidationUpdate(data) {
    const userSchema = Joi.object({
        fullname: Joi.string().min(5),
        phone: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(8),
        role: Joi.string(),
        regionId: Joi.number(),
    })
    return userSchema.validate(data)
}

export { userValidation, userValidationUpdate }
