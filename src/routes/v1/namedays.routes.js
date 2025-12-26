const express = require("express");
const router = express.Router();

const {
    getAll,
    getMonth,
    getMonthDate,
    getMonthDateCountry,
} = require("../../controllers/namedays.controller");

const { cacheMiddleware } = require("../../middleware/cache.middleware");
const { apiLimiter } = require("../../middleware/rateLimit.middleware");

// Apply rate limiting to all v1 routes
router.use(apiLimiter);

router.get("/namedays", cacheMiddleware(60), getAll);

router.get("/namedays/:month", cacheMiddleware(60), getMonth);

router.get("/namedays/:month/:date", cacheMiddleware(60), getMonthDate);

router.get("/namedays/:month/:date/:country", cacheMiddleware(60), getMonthDateCountry);

module.exports = router;
