import Joi from "joi";

export function announcementRegionValidation(data) {
    const announcementRegionSchema = Joi.object({
        regionId: Joi.number().required().positive(),
        announcementId: Joi.number().required().positive()
    })
    return announcementRegionSchema.validate(data)
}
