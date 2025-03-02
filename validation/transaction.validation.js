import Joi from "joi";

export function transactionValidation(data) {
    const transactionSchema = Joi.object({
        userId: Joi.number().positive(),
        announcementId: Joi.number().required().positive(),
        summa: Joi.number().required().positive()
    })
    return transactionSchema.validate(data)
}
