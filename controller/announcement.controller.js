import { announcementValidation, announcementValidationUpdate } from "../validation/announcement.validation.js";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient({
    omit: {
        user: {
            password: true,
            status: true
        }
    }
})

async function getAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        let filters = {
            user: { regionId: { equals: req.user.region } },
            balance: { lte: client.announcement.fields.target },
        }

        let announcements = await client.announcement.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                Likes: {
                    _count: 'desc'
                }
            },
            include: {
                category: true,
                user: true,
                Comment: {
                    include: { user: true, announcement: true }
                },
                Likes: {
                    include: { user: true, announcement: true }
                },
                Announcement_Region: {
                    include: {
                        region: true,
                    }
                }
            },
        },
            client.announcement.count({
                where: filters
            })
        )
        if (!announcements.length) return res.status(200).send({ msg: "Announcements are empty!!!" })
        res.status(200).send({ data: announcements })
    } catch (error) {
        console.log(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let announcement = await client.announcement.findUnique({
            where: { id: +id },
            include: {
                category: true,
                user: true,
                Comment: {
                    include: { user: true, announcement: true }
                },
                Likes: {
                    include: { user: true, announcement: true }
                },
                Announcement_Region: {
                    include: {
                        region: true,
                    }
                }
            }
        })
        if (!announcement) return res.status(200).send({ msg: "Not found!!!" })
        res.status(200).send({ data: announcement })
    } catch (error) {
        console.log(error.message);
    }
}

async function create(req, res) {
    try {
        let { id } = req.user
        let body = req.body
        let { error } = announcementValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let announcement = await client.announcement.create({ data: { ...body, userId: id } })
        res.status(200).send({ data: announcement })
    } catch (error) {
        console.log(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.user
        let announcement = await client.announcement.delete({ where: { id: +id } })
        res.status(200).send({ data: announcement })
    } catch (error) {
        console.log(error.message);
    }
}

async function update(req, res) {
    try {
        let body = req.body
        let { id } = req.user
        let { error } = announcementValidationUpdate(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let announcement = await client.announcement.update({
            where: { id: +id },
            data: body
        })
        res.status(200).send({ data: announcement })
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, getOne, create, update, remove }
