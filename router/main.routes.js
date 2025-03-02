import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { regionRouter } from "./regions.routes.js";
import { categoryRouter } from "./category.routes.js";
import { announcementRouter } from "./announcement.routes.js";
import uploadImageRouter from "./upload-image.routes.js";
import { commentRouter } from "./comments.routes.js";
import { likesRouter } from "./likes.routes.js";
import { announcementRegionRouter } from "./announcement_region.routes.js";
import { transactionRouter } from "./transaction.routes.js";

export const mainRouter = Router()

mainRouter.use("/users", userRouter)
mainRouter.use("/regions", regionRouter)
mainRouter.use("/categories", categoryRouter)
mainRouter.use("/announcements", announcementRouter)
mainRouter.use("/upload-image", uploadImageRouter)
mainRouter.use("/comments", commentRouter)
mainRouter.use("/likes", likesRouter)
mainRouter.use("/announcementRegion", announcementRegionRouter)
mainRouter.use("/transactions", transactionRouter)

