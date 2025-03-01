import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controller/category.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { rolePolice } from "../middleware/rolePolice.middleware.js";

export const categoryRouter = Router()

categoryRouter.get("/", verifyToken, getAll)
categoryRouter.get("/:id", verifyToken, getOne)
categoryRouter.post("/", verifyToken, rolePolice(['ADMIN']), create)
categoryRouter.patch("/:id", verifyToken, rolePolice(['ADMIN']), update)
categoryRouter.delete("/:id", verifyToken, rolePolice(['ADMIN']), remove)
