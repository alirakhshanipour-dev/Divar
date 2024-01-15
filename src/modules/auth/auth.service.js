import autoBind from "auto-bind"
import { UserModel } from "../user/user.model.js"
import createHttpError from "http-errors"
import { AuthMessages } from "./messages/auth.messages.js"
import { randomInt } from "crypto"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export const AuthService = (() => {
    class AuthService {
        #model
        constructor() {
            autoBind(this)
            this.#model = UserModel
        }

        // send otp code to user
        async send_otp(phone) {
            const user = await this.#model.findOne({ phone })
            const now = new Date().getTime()
            const otp = {
                code: randomInt(10000, 99999),
                expiresIn: now + (1000 * 60 * 2)
            }
            if (!user) {
                const newUser = await this.#model.create({ phone, otp })
                return newUser
            }
            if (user && user.otp.expiresIn > now)
                throw new createHttpError.BadRequest(AuthMessages.OtpCodeNotExpired)

            user.otp = otp
            await user.save()
            return user

        }

        // check otp code
        async check_otp(phone, code) {
            const user = await this.check_user_exists_by_phone(phone)
            const now = new Date().getTime()
            if (user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessages.OtpCodeExpired)
            if (user?.otp?.code !== code) throw new createHttpError.Unauthorized(AuthMessages.OtpCodeNotCorrect)
            if (!user.verified_phone) {
                user.verified_phone = true
            }
            const accessToken = this.sign_token({ phone, userID: user._id })
            user.access_token = accessToken
            await user.save()
            return user
        }



        // asistant methods --------------------
        async check_user_exists_by_phone(phone) {
            const user = await this.#model.findOne({ phone })
            if (!user) throw new createHttpError.NotFound(AuthMessages.UserNotFound)
            return user
        }

        sign_token(payload) {
            const secretKey = process.env.JWT_SECRET
            return jwt.sign(payload, secretKey, { expiresIn: "1d" })
        }
    }


    return new AuthService()
})()