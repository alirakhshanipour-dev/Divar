import { Router } from "express";
import { AuthRouter } from "./modules/auth/auth.routes.js";
import { UserRouter } from "./modules/user/user.routes.js";
import { CategoryRouter } from "./modules/category/category.routes.js";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/user", UserRouter)
router.use("/category", CategoryRouter)


export { router as MainRouter }