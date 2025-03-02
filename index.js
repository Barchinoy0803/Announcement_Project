import express from "express"
import dotenv from "dotenv"
import { mainRouter } from "./router/main.routes.js"
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use("/api", mainRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
