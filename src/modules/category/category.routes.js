import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { CategoryValidator } from "./validations/create_category.validation.js";

const router = Router()

// routers
router.post("/create", CategoryValidator, CategoryController.create_category)

export { router as CategoryRouter }