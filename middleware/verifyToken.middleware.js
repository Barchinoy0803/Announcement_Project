import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const accessSecret = process.env.ACCESS_SECRET

export function verifyToken(req, res, next) {
    try {
        let header = req.header("Authorization")
        if(header){
            let [_, token] = header.split(" ")

            if (!token) return res.status(401).send({ msg: "Token not found!!!" })

            let data = jwt.decode(token, accessSecret)
            req.user = data
            next()
        }else{
            return res.status(401).send({ msg: "Token not found!!!" })
        }
    } catch (error) {
        console.log(error.message);
    }
}
