import autoBind from "auto-bind"
import { OptionModel } from "./option.model.js"
import createHttpError from "http-errors"
import { CategoryMessages } from "../category/messages/category.messages.js"
import { OptionMessages } from "./messages/option.messages.js"
import slugify from "slugify"
import { CategoryModel } from "../category/category.model.js"
import { isValidObjectId } from "mongoose"

export const OptionService = (() => {
    class OptionService {
        #model
        #categoryModel
        constructor() {
            autoBind(this)
            this.#model = OptionModel
            this.#categoryModel = CategoryModel
        }

        async create(optionDTO) {
            const category = await this.#categoryModel.findById(optionDTO.category)
            if (!category) throw new createHttpError.NotFound(CategoryMessages.CategoryNotFound)
            optionDTO.category = category._id
            optionDTO.key = slugify(optionDTO.key, { trim: true, replacement: "_", lower: true })
            await this.check_option_exists_by_category_key(optionDTO.key, optionDTO.category)
            if (optionDTO.enum && typeof optionDTO.enum === "string") {
                optionDTO.enum = optionDTO.enum.split(",")
            } else if (Array.isArray(optionDTO.enum)) optionDTO.enum = []
            const option = await this.#model.create(optionDTO)
            return option
        }


        async findByCategoryId(id) {
            if (!isValidObjectId(id)) throw new createHttpError.Conflict(CategoryMessages.CategortNotValid)
            const options = await this.#model.find({ category: id }, { __v: 0 })
                .populate([{
                    path: "category",
                    select: { name: 1, slug: 1 }
                }])
            return options
        }
        async findById() { }
        async find() {
            const options = await this.#model.find({},
                { _id: 0, __v: 0 },
                { sort: { _id: -1 } })
                .lean()
                .populate({
                    path: "category",
                    select: { name: 1, slug: 1 }
                })
            return options
        }


        // asistant methods
        async check_option_exists_by_id(id) {
            const option = await this.#model.findById(id)
            if (!option) throw new createHttpError.NotFound(OptionMessages.OptionNotFound)
            return option
        }

        async check_option_exists_by_category_key(key, category) {
            const option = await this.#model.findOne({ category, key })
            if (option) throw new createHttpError.Conflict(OptionMessages.AlreadyExists)
            return null
        }
    }
    return new OptionService()
})() 