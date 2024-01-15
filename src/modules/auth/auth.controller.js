import autoBind from "auto-bind"
import { AuthService } from "./auth.service.js"
import { AuthMessages } from "./messages/auth.messages.js"
import { StatusCodes } from "http-status-codes"
import { config } from "dotenv"
import { NodeEnv } from "../../constant/env.enum.js"
import { CookieNames } from "../../constant/cookie.enum.js"
config()

export const AuthController = (() => {
    class AuthController {
        #service
        constructor() {
            autoBind(this)
            this.#service = AuthService
        }

        // sending otp code to user
        async send_otp(req, res, next) {
            try {
                const { phone } = req.body
                const user = await this.#service.send_otp(phone)
                return res.status(StatusCodes.OK).json({
                    message: AuthMessages.SendOtpSuccessfully,
                    data: {
                        code: user?.otp?.code
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async check_otp(req, res, next) {
            try {
                const { phone, code } = req.body
                const user = await this.#service.check_otp(phone, code)

                // set access token in cookie
                return res.cookie(CookieNames.AccessToken, user.access_token,
                    {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === NodeEnv.Production
                    }).status(StatusCodes.OK).json({
                        message: AuthMessages.LoginSuccessfully,
                        user: { phone: user?.phone, accessToken: user?.access_token }
                    })
            } catch (error) {
                next(error)
            }
        }

        // logout user
        async logout(req, res, next) {
            try {
                return res.clearCookie(CookieNames.AccessToken).status(StatusCodes.OK).json({
                    message: AuthMessages.LogoutSuccessfully
                })
            } catch (error) {
                next(error)
            }
        }
    }
    return new AuthController()
})()