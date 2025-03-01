import { PrismaClient } from "@prisma/client";
import { userValidation, userValidationUpdate } from "../validation/users.validation.js";
import bcrypt from "bcrypt"
import { totp } from "otplib"
import { transporter } from "../services/user.service.js";
import jwt from "jsonwebtoken"

let client = new PrismaClient()
let OTP_KEY = process.env.SECRET_KEY

async function myInfo(req, res) {
    try {
        let id = req.user.id
        let user = await client.user.findUnique({ where: { id: +id } })
        if (!user) return res.status(401).send({ msg: "Not found this user!!!" })
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error.message);
    }
}

async function register(req, res) {
    try {
        let { email, password } = req.body

        let user = await client.user.findUnique({ where: { email } })
        if (user) return res.status(400).send({ msg: "Already exists!" })

        let { error, value } = userValidation(req.body)
        if (error) return res.status(400).send({ msg: error.details[0].message })

        value.password = await bcrypt.hash(password, 8)
        let registered = await client.user.create({ data: value })

        let otp = totp.generate(`${OTP_KEY}${email}`)
        await transporter.sendMail({
            to: email,
            subject: 'One time password',
            html: `This is an OTP to activate your account: <h1>${otp}</h1>`,
        })

        res.status(200).send({ data: registered })
    } catch (error) {
        console.log(error.message);
    }
}

async function login(req, res) {
    try {
        let { email, password } = req.body
        let user = await client.user.findUnique({ where: { email } })
        if (!(bcrypt.compareSync(password, user.password))) {
            return res.status(400).send({ msg: "Email or password invalid!" })
        }

        if (user.status === "INACTIVE") return res.status(400).send({ msg: "Your account is not activated!!!" })

        let accessToken = await accessTokenGenerate({ id: user.id, email: user.email, role: user.role, region: user.regionId })
        res.status(200).send({ access_token: accessToken });
    } catch (error) {
        console.log(error.message);
    }
}

async function accessTokenGenerate(payload) {
    try {
        let accessSecret = process.env.ACCESS_SECRET
        return jwt.sign(payload, accessSecret)
    } catch (error) {
        console.log(error.message);
    }
}

async function activate(req, res) {
    try {
        let { email, otp } = req.body
        const user = await client.user.findUnique({ where: { email } })
        if (!user) return res.status(400).send({ msg: "Not found!!!" })

        let checkOtp = totp.verify({ token: otp, secret: `${OTP_KEY}${email}` })
        if (!checkOtp) return res.status(400).send({ msg: "Otp or email wrong!" })

        if (user.status === "INACTIVE") {
            await client.user.update({
                where: { email },
                data: {
                    status: 'ACTIVE'
                }
            })
        }
        res.status(200).send({ message: "Your account has been activated successfully✅" });
    } catch (error) {
        console.log(error.message);
    }
}

async function getAll(req, res) {
    try {
        let users = await client.user.findMany()
        if (!users.length) return res.status(200).send({ msg: "Users are empty!" })
        res.status(200).send({ data: users })
    } catch (error) {
        console.log(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let user = await client.user.findUnique({ where: { id: +id } })
        if (!user) return res.status(200).send({ msg: "User not found" })
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        let user = await client.user.delete({ where: { id: +id } })
        if (!user) return res.status(200).send({ msg: "Not found this user!" })
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error.message);
    }
}

async function update(req, res) {
    try {
        let { id } = req.params
        let body = req.body
        let { error } = userValidationUpdate(body)
        if (error) return res.status(400).send({ msg: error.details[0].message })

        let user = await client.user.update({
            where: {id: +id},
            data: body 
        })
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error.message);
    }
}

export { register, login, getAll, getOne, activate, update, remove, myInfo }
