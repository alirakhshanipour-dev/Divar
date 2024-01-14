import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import fs from "fs";

export const SwaggerConfig = (() => {
    class SwaggerConfig {
        #swaggerDocument;

        constructor() {
            this.#swaggerDocument = swaggerJSDoc({
                swaggerDefinition: {
                    openapi: "3.0.1",
                    info: {
                        title: "divar backend",
                        description: "sample for projects like divar",
                        version: "1.0.0",
                    },
                },
                apis: ["./src/modules/**/*.swagger.js"],
            });
        }

        setup(app) {
            // Enable CORS for all routes
            app.use(cors());

            // Serve Swagger JSON separately
            app.get("/api-docs/swagger.json", (req, res) => {
                res.json(this.#swaggerDocument);
            });

            // Serve Swagger UI with custom CSS
            const swaggerUiOptions = {
                swaggerOptions: {
                    url: "/api-docs/swagger.json",
                },
                customCss: fs.readFileSync(process.cwd() + "/src/config/api/css/style.css", "utf-8"),
            };

            // Serve Swagger UI at /api-docs endpoint
            app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(this.#swaggerDocument, swaggerUiOptions));
        }
    }

    return new SwaggerConfig();
})();
