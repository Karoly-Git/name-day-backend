const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Name Days API",
            version: "1.0.0",
            description:
                "API for retrieving name days by month, date, and country",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Local server",
            },
            {
                url: "https://name-day-backend-0d74dcea0ed2.herokuapp.com",
                description: "Heroku server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
