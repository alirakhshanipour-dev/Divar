import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
export const SwaggerConfig = (() => {
    class SwaggerConfig {
        #swaggerDocument
        constructor() {
            this.#swaggerDocument = swaggerJSDoc({
                swaggerDefinition: {
                    openapi: "3.0.1",
                    info: {
                        title: "divar backend",
                        description: "sample for projects like divar",
                        version: "1.0.0"
                    }
                },
                apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
            })
        }
        setup(app) {
            const swagger = swaggerUi.setup(this.#swaggerDocument, {})
            app.use("/api-docs", swaggerUi.serve, swagger)
        }
    }
    return new SwaggerConfig()
})()