import autoBind from "auto-bind"
import { StatusCodes } from "http-status-codes"
import { UserService } from "./user.service.js"


export const UserController = (() => {
    class UserController {
        #service
        constructor() {
            autoBind(this)
            this.#service = UserService
        }

        async get_user_profile(req, res, next) {
            try {
                const user = req.user
                return res.status(StatusCodes.OK).json({ user })
            } catch (error) {
                next(error)
            }
        }

    }
    return new UserController()
})()