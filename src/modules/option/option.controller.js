import autoBind from "auto-bind"
import { OptionService } from "./option.service.js"
import { StatusCodes } from "http-status-codes"
import { OptionMessages } from "./messages/option.messages.js"
import { isValidObjectId } from "mongoose"





export const OptionController = (() => {
    class OptionController {
        #service
        constructor() {
            autoBind(this)
            this.#service = OptionService
        }


        async create(req, res, next) {
            try {
                const { title, key, guide, enum: list, type, category } = req.body
                await this.#service.create({ title, key, guide, enum: list, type, category })
                return res.status(StatusCodes.CREATED).json({
                    message: OptionMessages.OptionCreated
                })
            } catch (error) {
                next(error)
            }
        }


        async findByCategoryId(req, res, next) {
            try {
                const { categoryId } = req.params
                const options = await this.#service.findByCategoryId(categoryId)
                return res.status(StatusCodes.OK).json({
                    options
                })
            } catch (error) {
                next(error)
            }
        }
        async findById(req, res, next) {
            try {
                const { id } = req.params
                const option = await this.#service.findById(id)
                return res.status(StatusCodes.OK).json(option)
            } catch (error) {
                next(error)
            }
        }
        async findByCategorySlug(req, res, next) {
            try {
                const { slug } = req.params
                const options = await this.#service.findByCategorySlug(slug)
                return res.status(StatusCodes.OK).json(options)
            } catch (error) {
                next(error)
            }
        }
        async find(req, res, next) {

            try {
                const options = await this.#service.find()
                return res.status(StatusCodes.OK).json(options)
            } catch (error) {
                next(error)
            }
        }

    }
    return new OptionController()
})()