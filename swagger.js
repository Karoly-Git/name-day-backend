
/**
 * 
 * A Terms of Use Agreement
Terms of use is a legal agreement between the end-user and an organization, defining how the end-user should ideally use the API’s services. These terms should include API limits under best practices, with terms and conditions. Constraints also need to be clearly stated so that end-users understand what API usage and practices are permitted, so they don’t accidentally have their access restricted.
 */

const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 8000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Name Day API",
            summary: "",
            description: "API for retrieving name days by month, date, and country",
            termsOfService: "https://karoly-git.github.io/name-day-frontend/",
            contact: {
                name: "Karoly Hornyak",
                url: "https://karolyhornyak.com",
                email: "karoly.webdev@gmail.com",
            },
            license: {
                "name": "Name Days API",
                "url": "https://karoly-git.github.io/name-day-frontend/"
            },
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Developer Local server",
            },
            {
                // IMPORTANT: avoid trailing slash here
                url: "https://name-day-backend-0d74dcea0ed2.herokuapp.com",
                description: "Production Heroku server",
            },
        ],
        tags: [{ name: "NameDays" }],
        components: {
            schemas: {
                GeneralError: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            example: "Data not found"
                        },
                    },
                    required: ["error"],
                },

                NameDaysAllResponse: {
                    type: "object",
                    description: "Month → day → language → list of name days",
                    additionalProperties: {
                        type: "object",
                        additionalProperties: {
                            type: "object",
                            properties: {
                                hu: {
                                    type: "array",
                                    items: { type: "string" }
                                },
                                pl: {
                                    type: "array",
                                    items: { type: "string" }
                                }
                            }
                        }
                    },
                    example: {
                        january: {
                            "1": {
                                hu: ["Fruzsina"],
                                pl: ["Mieczysław", "Mieczysława"]
                            },
                            "2": {
                                hu: ["Ábel"],
                                pl: ["Abel"]
                            }
                        }
                    }
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
