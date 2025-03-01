import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { regionRouter } from "./regions.routes.js";
import { categoryRouter } from "./category.routes.js";

const mainRouter = Router()

mainRouter.use("/users", userRouter)
mainRouter.use("/regions", regionRouter)
mainRouter.use("/categories", categoryRouter)

export default mainRouter;
