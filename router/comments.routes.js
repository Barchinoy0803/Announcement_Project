import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controller/comments.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { selfPolice } from "../middleware/selfPolice.middleware.js";

export const commentRouter = Router() 

commentRouter.get("/", verifyToken, getAll)
commentRouter.get("/:id", verifyToken, getOne)
commentRouter.post("/", verifyToken, create)
commentRouter.patch("/:id/:commentId", verifyToken, selfPolice(['ADMIN']), update)
commentRouter.delete("/:id/:commentId", verifyToken, selfPolice(['ADMIN']), remove)
