import autoBind from "auto-bind"
import { OptionModel } from "./option.model.js"
import createHttpError from "http-errors"
import { CategoryMessages } from "../category/messages/category.messages.js"
import { OptionMessages } from "./messages/option.messages.js"
import slugify from "slugify"
import { CategoryModel } from "../category/category.model.js"
import { isValidObjectId } from "mongoose"
import { CategoryService } from "../category/category.service.js"
import { isFalse, isTrue } from "../../common/utils.js"

export const OptionService = (() => {
    class OptionService {
        #model
        #categoryModel
        #categoryService
        constructor() {
            autoBind(this)
            this.#model = OptionModel
            this.#categoryService = CategoryService
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
            if (!isValidObjectId(id)) throw new createHttpError.Conflict(CategoryMessages.CategoryNotValid)
            const options = await this.#model.find({ category: id }, { __v: 0 })
                .populate([{
                    path: "category",
                    select: { name: 1, slug: 1 }
                }])
            return options
        }
        async findByCategorySlug(slug) {
            const options = await this.#model.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    },
                }, {
                    $unwind: "$category"
                }, {
                    $addFields: {
                        categoryName: "$category.name",
                        categorySlug: "$category.slug",
                        categoryIcon: "$category.icon",
                    }
                }, {
                    $project: {
                        category: 0,
                        __v: 0
                    }
                }, {
                    $match: {
                        categorySlug: slug
                    }
                }
            ])
            return options
        }
        async findById(id) {
            if (!isValidObjectId(id)) throw new createHttpError.Conflict(OptionMessages.OptionNotValid)
            const option = await this.#model.findById(id)

            if (!option) throw new createHttpError.NotFound(OptionMessages.OptionNotFound)
            return option
        }

        async find() {
            const options = await this.#model.find({},
                { __v: 0 },
                { sort: { _id: -1 } })
                .lean()
                .populate({
                    path: "category",
                    select: { name: 1, slug: 1 }
                })
            return options
        }


        async delete(id) {
            await this.check_option_isvalid(id)
            await this.check_option_exists_by_id(id)
            return await this.#model.deleteOne({ _id: id })
        }


        async update(id, optionDto) {
            const existOption = await this.check_option_exists_by_id(id);
            if (optionDto.category && isValidObjectId(optionDto.category)) {
                const category = await this.#categoryService.check_category_exists_by_id(optionDto.category);
                optionDto.category = category._id;
            } else {
                delete optionDto.category
            }
            if (optionDto.slug) {
                optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
                let categoryId = existOption.category;
                if (optionDto.category) categoryId = optionDto.category;
                await this.check_option_exists_by_category_key(optionDto.key, categoryId, id)
            }
            if (optionDto?.enum && typeof optionDto.enum === "string") {
                optionDto.enum = optionDto.enum.split(",")
            } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum;

            if (isTrue(optionDto?.required)) optionDto.required = true;
            else if (isFalse(optionDto?.required)) optionDto.required = false;
            else delete optionDto?.required
            return await this.#model.updateOne({ _id: id }, { $set: optionDto })
        }


        // asistant methods
        async check_option_isvalid(id) {
            if (!isValidObjectId(id)) throw new createHttpError.Conflict(OptionMessages.OptionNotValid)
            return null
        }
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