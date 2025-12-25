const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const v1NameDaysRoutes = require("./src/routes/v1/namedays.routes");

const app = express();

// If behind Heroku / proxies, helps rate-limit and IP handling
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

// CORS (important for Swagger UI)
app.use(
    cors({
        origin: "*", // tighten later if needed
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Versioned API routes
app.use("/api/v1", v1NameDaysRoutes);

module.exports = app;
