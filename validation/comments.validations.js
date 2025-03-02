import Joi from "joi";

function commentValidation(data) {
    const commentSchema = Joi.object({
        text: Joi.string().min(2).required(),
        announcementId: Joi.number().required(),
        userId: Joi.number().positive(),
    })
    return commentSchema.validate(data)
}


function commentValidationUpdate(data) {
    const commentSchema = Joi.object({
        text: Joi.string().min(2)
    })
    return commentSchema.validate(data)
}

export { commentValidation, commentValidationUpdate }
