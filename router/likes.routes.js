import { Router } from "express";
import { create, getAll } from "../controller/likes.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

export const likesRouter = Router()

likesRouter.post("/", verifyToken,  create)
likesRouter.get("/", verifyToken,  getAll)
