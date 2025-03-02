import Joi from "joi";

function announcementValidation(data) {
    const announcementSchema = Joi.object({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        balance: Joi.number().positive(),
        target: Joi.number().required().positive(),
        userId: Joi.number().positive(),
        status: Joi.number().positive(),
        photo: Joi.string().required(),
        categoryId: Joi.number().required().positive(),
    })
    return announcementSchema.validate(data)
}


function announcementValidationUpdate(data) {
    const announcementSchema = Joi.object({
        name: Joi.string().min(2),
        description: Joi.string().min(2),
        balance: Joi.number().positive(),
        target: Joi.number().positive(),
        userId: Joi.number().positive(),
        status: Joi.number().positive(),
        photo: Joi.string(),
        categoryId: Joi.number().positive(),
    })
    return announcementSchema.validate(data)
}

export { announcementValidation, announcementValidationUpdate }
