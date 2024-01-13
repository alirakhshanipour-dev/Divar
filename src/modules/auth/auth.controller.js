import autoBind from "auto-bind"
import { AuthService } from "./auth.service.js"
import { AuthMessages } from "./messages/auth.messages.js"

export const AuthController = (() => {
    class AuthController {
        #service
        constructor() {
            autoBind(this)
            this.#service = AuthService
        }

        async send_otp(req, res, next) {
            try {
                const { phone } = req.body
                await this.#service.send_otp(phone)
                return res.json({
                    message: AuthMessages.SendOtpSuccessfully
                })
            } catch (error) {
                next(error)
            }
        }
        async check_otp() { }
    }
    return new AuthController()
})()