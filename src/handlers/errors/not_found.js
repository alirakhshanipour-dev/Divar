import { StatusCodes } from "http-status-codes";

export const notFoundHandler = (app) => {
    app.use((req, res, next) => {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "not found route"
        });
    });
};
