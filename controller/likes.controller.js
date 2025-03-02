import { likesValidation } from "../validation/likes.validation.js";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

async function getAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        let likes = await client.likes.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: { announcement: true }
        })
        if (!likes.length) return res.status(200).send({ msg: "No such likes!!!   " })
        res.status(200).send({ data: likes })
    } catch (error) {
        console.log(error.message);
    }
}


async function create(req, res) {
    try {
        let { id } = req.user
        let body = req.body
        let { error } = likesValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let exsitingLike = await client.likes.findFirst({ where: { announcementId: body.announcementId, userid: id } })
        if (!exsitingLike) {
            let likes = await client.likes.create({
                data: {
                    announcementId: body.announcementId,
                    userid: id
                }
            })
            res.status(200).send({ data: likes, msg: "Liked 👍🏻" })
        } else {
            await client.likes.delete({ where: { id: exsitingLike.id } })
            res.status(200).send({ msg: "Unliked 👎🏻" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export { create, getAll }
