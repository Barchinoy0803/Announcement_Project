import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controller/announcement.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { selfPolice } from "../middleware/selfPolice.middleware.js";

export const announcementRouter = Router()

announcementRouter.get("/", verifyToken, getAll)
announcementRouter.get("/:id", verifyToken, getOne)
announcementRouter.post("/", verifyToken, create)
announcementRouter.patch("/:id", verifyToken, selfPolice(['ADMIN']), update)
announcementRouter.delete("/:id", verifyToken, selfPolice(['ADMIN']), remove)
