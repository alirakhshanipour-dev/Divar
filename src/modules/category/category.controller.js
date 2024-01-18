import autoBind from "auto-bind"
import { CategoryService } from "./category.service.js"
import { CategoryMessages } from "./messages/category.messages.js"
import { StatusCodes } from "http-status-codes"



export const CategoryController = (() => {
    class CategoryController {
        #service
        constructor() {
            autoBind(this)
            this.#service = CategoryService
        }


        // create category
        async create_category(req, res, next) {
            try {

                let { name, slug, icon, parent } = req.body
                await this.#service.create_category({ name, slug, icon, parent })
                return res.status(StatusCodes.CREATED).json({
                    message: CategoryMessages.CreateCategory,
                })
            } catch (error) {
                next(error)
            }
        }

        // get all categories
        async get_categories(req, res, next) {
            try {

            } catch (error) {
                next(error)
            }
        }

        // get category
        async get_category(req, res, next) {
            try {

            } catch (error) {
                next(error)
            }
        }
    }
    return new CategoryController()
})()