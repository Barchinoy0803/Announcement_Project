import { transactionValidation } from "../validation/transaction.validation.js";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()

async function getAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        let transactions = await client.transaction.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                announcement: true,
                user: true,
            }
        })
        if (!transactions.length) return res.status(200).send({ msg: "Transactions are empty!!!" })
        res.status(200).send({ data: transactions })
    } catch (error) {
        console.log(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let transaction = await client.transaction.findUnique({ where: { id: +id } })
        if (!transaction) return res.status(200).send({ msg: "Not found!" })
        res.status(200).send({ data: transaction })
    } catch (error) {
        console.log(error.message);
    }
}

async function create(req, res) {
    try {
        let { id } = req.user
        let body = req.body
        let { error } = transactionValidation(req.body)
        if (error) return res.status(400).send({ msg: error.details[0].message })
        let user = await client.user.findUnique({ where: { id: +id } })
        let announcement = await client.announcement.findFirst({
            include: {
                Announcement_Region: true
            },
            where: { Announcement_Region: { some: { announcementId: +body.announcementId } } },
        })

        if (user.regionId != announcement.Announcement_Region[0].regionId) return res.status(400).send({ msg: "It's not your region!!!" })

        if (announcement.status === "COMPLETED") return res.status(200).send({ msg: "This announcement is completed!" })

        if (user.balance >= body.summa) {
            let transaction = await client.transaction.create({ data: { ...body, userId: id } })
            await client.user.update({
                where: { id: +id },
                data: {
                    balance: +user.balance - +body.summa
                }
            })

            let status = +announcement.balance + +body.summa >= +announcement.target ? 'COMPLETED' : 'ACTIVE'

            await client.announcement.update({
                where: { id: body.announcementId },
                data: {
                    status,
                    balance: +announcement.balance + +body.summa,
                }
            })
            res.status(200).send({ data: transaction, msg: "successfully transferred" })
        } else {
            res.status(200).send({ msg: "You don't have enough money in your account" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, create, getOne }
