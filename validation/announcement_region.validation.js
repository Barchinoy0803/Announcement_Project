import Joi from "joi";

export function announcementRegionValidation(data) {
    const announcementRegionSchema = Joi.object({
        regionId: Joi.number().required(),
        announcementId: Joi.number().required()
    })
    return announcementRegionSchema.validate(data)
}
