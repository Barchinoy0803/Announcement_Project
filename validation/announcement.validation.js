import Joi from "joi";

export function announcementValidation(data) {
    const announcementSchema = Joi.object({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        balance: Joi.number(),
        target: Joi.number().required(),
        userId: Joi.number().required(),
        status: Joi.number(),
        photo: Joi.string().required(),
        categoryId: Joi.number().required(),
    })
    return announcementSchema.validate(data)
}
