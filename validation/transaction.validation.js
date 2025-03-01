import Joi from "joi";

export function transactionValidation(data) {
    const transactionSchema = Joi.object({
        userId: Joi.number().required(),
        announcementId: Joi.number().required(),
        summa: Joi.number().required()
    })
    return transactionSchema.validate(data)
}
