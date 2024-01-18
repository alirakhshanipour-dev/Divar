import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import slugify from "slugify";
import { CategoryMessages } from "../messages/category.messages.js";
import { StatusCodes } from "http-status-codes";
import { CategoryModel } from "../category.model.js";


export const CategoryValidator = [
    body('name').isString().notEmpty(),
    body('slug').optional().isString().custom(async (value, { req }) => {
        const existingCategory = await CategoryModel.findOne({ slug: value });
        if (existingCategory) {
            throw new createHttpError.BadRequest(CategoryMessages.SlugExists);
        }
        return true;
    }),
    body('icon').isString().notEmpty(),
    body('parent').optional().isString().custom(value => {
        if (value && !Types.ObjectId.isValid(value))
            throw new createHttpError.BadRequest(CategoryMessages.ParentNotValid);
        return true;
    }),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorDetails = errors.array().map(error => {
                return {
                    field: error.path,
                    msg: error.msg
                };
            });
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorDetails });
        }

        req.body.name = req.body.name.toLowerCase();
        req.body.icon = req.body.icon.toLowerCase();
        req.body.parent = req.body.parent ? req.body.parent.toLowerCase() : null;
        req.body.slug = req.body.slug || slugify(req.body.name, { lower: true });

        next();
    },
];
