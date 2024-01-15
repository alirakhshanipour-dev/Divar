import autoBind from "auto-bind"
import { UserModel } from "../user/user.model.js"


export const UserService = (() => {
    class UserService {
        #model
        constructor() {
            autoBind(this)
            this.#model = UserModel
        }


    }

    return new UserService()
})()