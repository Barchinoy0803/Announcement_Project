import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controller/regions.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { rolePolice } from "../middleware/rolePolice.middleware.js";

export const regionRouter = Router()

regionRouter.get("/", verifyToken, getAll)
regionRouter.get("/:id", verifyToken, getOne)
regionRouter.post("/", verifyToken, rolePolice(['ADMIN']), create)
regionRouter.patch("/:id", verifyToken, rolePolice(['ADMIN']), update)
regionRouter.delete("/:id", verifyToken, rolePolice(['ADMIN']), remove)
