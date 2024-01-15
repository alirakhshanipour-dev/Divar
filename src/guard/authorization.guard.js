import createHttpError from "http-errors"
import { GuardMessages } from "./messages/guard.messages.js"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { UserModel } from "../modules/user/user.model.js"
config()

export const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token
        console.log(token);
        if (!token) throw new createHttpError.Unauthorized(GuardMessages.Login)
        const secretKey = process.env.JWT_SECRET
        const data = jwt.verify(token, secretKey)
        if (data?.userID) {
            const user = await UserModel.findById(data.userID,
                { access_token: 0, otp: 0, __v: 0, verified_phone: 0, updatedAt: 0 }).lean()
            if (!user) throw new createHttpError.NotFound(GuardMessages.NotFoundUser)
            req.user = user
            return next()
        }
        throw new createHttpError.Unauthorized(GuardMessages.InvalidToken)

    } catch (error) {
        next(error)
    }
}