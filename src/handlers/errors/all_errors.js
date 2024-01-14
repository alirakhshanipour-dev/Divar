import { ErrorMessages } from "./messages/errors.js"

export const allErrorsHandler = (app) => {
    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode ?? err?.code
        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500
        res.status(status).json({
            message: err?.message ?? err?.stack ?? ErrorMessages.ServerError
        })
        next()
    })
}