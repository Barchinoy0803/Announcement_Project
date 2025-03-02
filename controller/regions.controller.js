import { PrismaClient } from "@prisma/client";
import { regionValidation } from "../validation/regions.validation.js";

const client = new PrismaClient()

async function getAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        let regions = await client.region.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                Announcement_Region: {
                    include: {
                        announcement: true
                    }
                }
            }
        })
        if (!regions.length) return res.status(200).send({ msg: "Regions are empty!" })
        res.status(200).send({ data: regions })
    } catch (error) {
        console.log(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let region = await client.region.findUnique({ where: { id: +id } })
        if (!region) return res.status(200).send({ msg: "Not found!" })
        res.status(200).send({ data: region })
    } catch (error) {
        console.log(error.message);
    }
}

async function create(req, res) {
    try {
        let body = req.body
        let { error } = regionValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        const region = await client.region.create({ data: body })
        res.status(200).send({ data: region })
    } catch (error) {
        console.log(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        let region = await client.region.delete({ where: { id: +id } })
        res.status(200).send({ data: region })
    } catch (error) {
        console.log(error.message);
    }
}

async function update(req, res) {
    try {
        let body = req.body
        let { id } = req.params
        let { error } = regionValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        const region = await client.region.update({
            where: { id: +id },
            data: body
        })
        res.status(200).send({ data: region })
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, getOne, create, update, remove }
