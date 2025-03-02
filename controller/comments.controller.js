import { commentValidation, commentValidationUpdate } from "../validation/comments.validations.js";
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
        let comments = await client.comment.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                user: true,
                announcement: true,
            }
        })
        if (!comments.length) return res.status(200).send({ msg: "Comments are empty!" })
        res.status(200).send({ data: comments })
    } catch (error) {
        console.log(error.message);
    }
}


async function getOne(req, res) {
    try {
        let { id } = req.params
        let comment = await client.comment.findUnique({
            include: {
                user: true,
                announcement: true,
            },
            where: { id: +id }
        })
        console.log(comment);

        if (!comment) return res.status(200).send({ msg: "Comment not found!!!" })
        res.status(200).send({ data: comment })
    } catch (error) {
        console.log(error.message);
    }
}


async function create(req, res) {
    try {
        let { id } = req.user
        let body = req.body
        let { error } = commentValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let comment = await client.comment.create({ data: { ...body, userId: id } })
        res.status(200).send({ data: comment })
    } catch (error) {
        console.log(error.message);
    }
}


async function remove(req, res) {
    try {
        let { commentId } = req.params
        let comment = await client.comment.delete({ where: { id: +commentId } })
        res.status(200).send({ data: comment })
    } catch (error) {
        console.log(error.message);
    }
}


async function update(req, res) {
    try {
        let { commentId } = req.params
        let body = req.body
        let { error } = commentValidationUpdate(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let comment = await client.comment.update({
            where: { id: +commentId },
            data: body
        })
        res.status(200).send({ data: comment })
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, getOne, create, update, remove }
