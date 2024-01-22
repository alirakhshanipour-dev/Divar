import autoBind from "auto-bind"
import { CategoryModel } from "./category.model.js"

import createHttpError from "http-errors"
import { CategoryMessages } from "./messages/category.messages.js"
import omitEmpty from "omit-empty"
import { Types } from "mongoose"
import { OptionModel } from "../option/option.model.js"

export const CategoryService = (() => {
    class CategoryService {
        #model
        #optionModel
        constructor() {
            autoBind(this)
            this.#model = CategoryModel
            this.#optionModel = OptionModel
        }

        async create_category(optionDTO) {

            await this.check_category_exists_by_name(optionDTO["name"])

            if (optionDTO?.parent) {
                const existCategory = await this.check_category_exists_by_id(optionDTO.parent);
                optionDTO.parent = existCategory._id
                optionDTO.parents = [
                    ... new Set(
                        ([existCategory._id.toString()].concat(
                            existCategory.parents.map(id => id.toString())
                        )).map(id => new Types.ObjectId(id))
                    )
                ]
            }
            console.log(optionDTO.parents);
            const category = await this.#model.create(optionDTO)
            return category
        }

        async get_categories() {
            const categories = await this.#model.find({}).lean()
            return categories
        }

        async get_category(id) {
            const category = await this.#model.findById(id)
            if (!category) throw new createHttpError.NotFound(CategoryMessages.CategoryNotFound)
            return category
        }

        async delete(id) {
            await this.check_category_exists_by_id(id)
            await this.#optionModel.deleteMany({ category: id }).then(async () => {
                await this.#model.deleteOne({ _id: id })
            })
            return true
        }


        // asistant methods
        async check_category_exists_by_name(name) {
            const category = await this.#model.findOne({ name }).lean()
            if (category) throw new createHttpError.NotFound(CategoryMessages.CategoryExistsByName)
            return true
        }

        async check_category_exists_by_id(id) {
            const category = await this.#model.findById(id).lean()
            if (!category) throw new createHttpError.NotFound(CategoryMessages.CategoryNotExistsById)
            return category
        }
    }
    return new CategoryService()
})()