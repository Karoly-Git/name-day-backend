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

/**
 * @openapi
 * /api/v1/namedays:
 *   get:
 *     summary: Get all name days data
 *     tags: [NameDays]
 *     responses:
 *       200:
 *         description: All name days
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NameDaysAllResponse'
 */
router.get("/namedays", cacheMiddleware(60), getAll);

/**
 * @openapi
 * /api/v1/namedays/{month}:
 *   get:
 *     summary: Get name days by month
 *     tags: [NameDays]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: january
 *     responses:
 *       200:
 *         description: Month data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MonthResponse'
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/namedays/:month", cacheMiddleware(60), getMonth);

/**
 * @openapi
 * /api/v1/namedays/{month}/{date}:
 *   get:
 *     summary: Get name days by month and date
 *     tags: [NameDays]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: january
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Date data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DateResponse'
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/namedays/:month/:date", cacheMiddleware(60), getMonthDate);

/**
 * @openapi
 * /api/v1/namedays/{month}/{date}/{country}:
 *   get:
 *     summary: Get name days by month, date, and country
 *     tags: [NameDays]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: january
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         example: pl
 *     responses:
 *       200:
 *         description: Country data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountryResponse'
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/namedays/:month/:date/:country",
    cacheMiddleware(60),
    getMonthDateCountry
);

module.exports = router;
