import { announcementRegionValidation } from "../validation/announcement_region.validation.js";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()

async function create(req, res) {
    try {
        let body = req.body
        let { error } = announcementRegionValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let junction = await client.announcement_Region.create({ data: body })
        res.status(200).send({ data: junction })
    } catch (error) {
        console.log(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        let junction = await client.announcement_Region.delete({ where: { id: +id } })
        res.status(200).send({ data: junction })
    } catch (error) {
        console.log(error.message);
    }
}

export { create, remove }
