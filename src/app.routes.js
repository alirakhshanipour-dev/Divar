import { Router } from "express";
import { AuthRouter } from "./modules/auth/auth.routes.js";

const router = Router()

router.use("/auth", AuthRouter)


export { router as MainRouter }