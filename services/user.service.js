import nodemailer from "nodemailer"
import { totp } from "otplib"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_SECRET
    },
},
    totp.options = { step: 600, digits: 5 }
)
