import Joi from "joi";

export function likesValidation(data) {
    const likesSchema = Joi.object({
        announcementId: Joi.number().required().positive(),
        userid: Joi.number().positive(),
    })
    return likesSchema.validate(data)
}
