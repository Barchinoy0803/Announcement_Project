import { Router } from "express";
import { create, getAll, getOne } from "../controller/transaction.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

export const transactionRouter = Router()

transactionRouter.get("/", verifyToken, getAll)
transactionRouter.get("/:id", verifyToken, getOne)
transactionRouter.post("/", verifyToken, create)
