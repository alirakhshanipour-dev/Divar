import { Router } from "express";
import { OptionController } from "./option.controller.js";

const router = Router()

// routes
router.post("/create", OptionController.create)
router.put("/:id", OptionController.update)
router.get("/by-category/:categoryId", OptionController.findByCategoryId)
router.get("/by-category-slug/:slug", OptionController.findByCategorySlug)
router.get("/:id", OptionController.findById)
router.get("/", OptionController.find)
router.delete("/:id", OptionController.delete)

export { router as OptionRouter }