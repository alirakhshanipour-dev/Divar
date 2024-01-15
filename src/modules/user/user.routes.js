import { Router } from "express";
import { UserController } from "./user.controller.js";
import { Authorization } from "../../guard/authorization.guard.js";


const router = Router()

// routers
router.get("/profile", Authorization, UserController.get_user_profile)

export { router as UserRouter }