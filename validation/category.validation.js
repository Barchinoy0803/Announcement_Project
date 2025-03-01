import Joi from "joi";

export function categoryValidation(data) {
    const categorySchema = Joi.object({
        name: Joi.string().min(2).required(),
    })
    return categorySchema.validate(data)
}
