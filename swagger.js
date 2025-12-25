const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 8000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Name Days API",
            version: "1.0.0",
            description: "API for retrieving name days by month, date, and country",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Local server",
            },
            {
                // IMPORTANT: usually avoid trailing slash here
                url: "https://name-day-backend-0d74dcea0ed2.herokuapp.com",
                description: "Heroku server",
            },
        ],
        tags: [{ name: "NameDays" }],
        components: {
            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Data not found" },
                    },
                    required: ["error"],
                },

                // These are intentionally flexible because your dataset is nested/dynamic.
                NameDaysAllResponse: {
                    type: "object",
                    additionalProperties: true,
                    example: {
                        january: {
                            "1": { pl: ["Name1", "Name2"] },
                        },
                    },
                },
                MonthResponse: {
                    type: "object",
                    additionalProperties: true,
                    example: {
                        "1": { pl: ["Name1", "Name2"] },
                    },
                },
                DateResponse: {
                    type: "object",
                    additionalProperties: true,
                    example: {
                        pl: ["Name1", "Name2"],
                    },
                },
                CountryResponse: {
                    type: "array",
                    items: { type: "string" },
                    example: ["Name1", "Name2"],
                },
            },
        },
    },

    // Scan files that contain @openapi blocks
    apis: ["./src/routes/v1/*.js"],
};

module.exports = swaggerJSDoc(options);
