import { Router } from "express";
import { create, remove } from "../controller/announcement_region.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { rolePolice } from "../middleware/rolePolice.middleware.js";

export const announcementRegionRouter = Router()

announcementRegionRouter.post("/", verifyToken, rolePolice(['ADMIN']), create)
announcementRegionRouter.delete("/:id", verifyToken, rolePolice(['ADMIN']), remove)
