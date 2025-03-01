import { Router } from "express";
import { activate, getAll, getOne, login, myInfo, register, remove, update } from "../controller/users.controller.js";
import { rolePolice } from "../middleware/rolePolice.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { selfPolice } from "../middleware/selfPolice.middleware.js";

export const userRouter = Router()

userRouter.get("/myinfo", verifyToken, myInfo)
userRouter.get("/:id", verifyToken, rolePolice(['ADMIN']), getOne)
userRouter.post("/register", register)
userRouter.post("/activate", activate)
userRouter.post("/login", login)
userRouter.get("/", verifyToken, rolePolice(['ADMIN']), getAll)
userRouter.delete("/:id", verifyToken, selfPolice(['ADMIN']), remove)
userRouter.patch("/:id", verifyToken, selfPolice(['ADMIN']), update)
