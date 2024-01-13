import express from "express"
import morgan from "morgan"
import { DatabaseConfig } from "./src/config/database/databaseConfig.js"
import { ServerConfig } from "./src/config/server/serverconfig.js"
import { SwaggerConfig } from "./src/config/api/swaggerConfig.js"
import { MainRouter } from "./src/app.routes.js"

const main = () => {
    const app = express()
    // middleware
    app.use(express.json())
    app.use(express.static("public"))
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan("tiny"))


    // router middlware
    app.use(MainRouter)


    // server and database and api configuration
    DatabaseConfig.connect_mongo()
    SwaggerConfig.setup(app)
    ServerConfig.run(app)
}

main()