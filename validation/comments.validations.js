import Joi from "joi";

export function commentValidation(data) {
    const commentSchema = Joi.object({
        text: Joi.string().min(2).required(),
        announcementId: Joi.number().required(),
        userId: Joi.number(),
    })
    return commentSchema.validate(data)
}
