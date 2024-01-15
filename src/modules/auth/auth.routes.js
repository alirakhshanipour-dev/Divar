import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { Authorization } from "../../guard/authorization.guard.js";

const router = Router()

// routers
router.post("/send-otp", AuthController.send_otp)
router.post("/check-otp", AuthController.check_otp)
router.get("/logout", Authorization, AuthController.logout)

export { router as AuthRouter }