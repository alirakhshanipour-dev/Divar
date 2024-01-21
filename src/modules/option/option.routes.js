import { Router } from "express";
import { OptionController } from "./option.controller.js";

const router = Router()

// routes
router.post("/create", OptionController.create)
router.get("/by-category/:categoryId", OptionController.findByCategoryId)
router.get("/by-category-slug/:slug", OptionController.findByCategorySlug)
router.get("/:id", OptionController.findById)
router.get("/", OptionController.find)

export { router as OptionRouter }