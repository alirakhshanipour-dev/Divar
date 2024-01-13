import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router()

// routers
router.post("/send-otp", AuthController.send_otp)
router.post("/check-otp", AuthController.check_otp)

export { router as AuthRouter }