import express from "express";
import morgan from "morgan";
import { DatabaseConfig } from "./src/config/database/databaseConfig.js";
import { ServerConfig } from "./src/config/server/serverconfig.js";
import { SwaggerConfig } from "./src/config/api/swaggerConfig.js";
import { MainRouter } from "./src/app.routes.js";
import { notFoundHandler } from "./src/handlers/errors/not_found.js";
import { allErrorsHandler } from "./src/handlers/errors/all_errors.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config()

const main = () => {
    const app = express();

    // middlewares
    app.use(express.json());
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))


    // router middleware
    app.use(MainRouter);

    // databse configuration
    DatabaseConfig.connect_mongo();

    // swagger configuration - API documentation
    SwaggerConfig.setup(app);

    // error handlers
    allErrorsHandler(app);
    notFoundHandler(app);

    // server configuration
    ServerConfig.run(app);
};

main();
