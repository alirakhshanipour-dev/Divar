import autoBind from "auto-bind"
import { AuthService } from "./auth.service.js"
import { AuthMessages } from "./messages/auth.messages.js"
import { StatusCodes } from "http-status-codes"

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
        async check_otp() { }
    }
    return new AuthController()
})()