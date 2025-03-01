import Joi from "joi";

export function likesValidation(data) {
    const likesSchema = Joi.object({
        announcementId: Joi.number().required(),
        userId: Joi.number(),
    })
    return likesSchema.validate(data)
}
