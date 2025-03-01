import { PrismaClient } from "@prisma/client";
import { categoryValidation } from "../validation/category.validation.js";

const client = new PrismaClient()

async function getAll(req, res) {
    try {
        let categories = await client.category.findMany()
        if (!categories.length) return res.status(200).send({ msg: "Categories are empty!" })
        res.status(200).send({ data: categories })
    } catch (error) {
        console.log(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let category = await client.category.findUnique({ where: { id: +id } })
        if (!category) return res.status(200).send({ msg: "Not found!" })
        res.status(200).send({ data: category })
    } catch (error) {
        console.log(error.message);
    }
}

async function create(req, res) {
    try {
        let body = req.body
        let { error } = categoryValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        const category = await client.category.create({ data: body })
        res.status(200).send({ data: category })
    } catch (error) {
        console.log(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        let category = await client.category.delete({ where: { id: +id } })
        res.status(200).send({ data: category })
    } catch (error) {
        console.log(error.message);
    }
}

async function update(req, res) {
    try {
        let body = req.body
        let { id } = req.params
        let { error } = categoryValidation(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        const category = await client.category.update({
            where: { id: +id },
            data: body
        })
        res.status(200).send({ data: category })
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, getOne, create, update, remove }
