const express = require('express');
const router = express.Router();

const nameDays = require('../../data/namedays.data');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all name days data
 *     responses:
 *       200:
 *         description: All name days
 */
router.get('/', (req, res) => {
    res.json(nameDays.nameDays);
});

/**
 * @swagger
 * /{month}:
 *   get:
 *     summary: Get name days for a month
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
 *       404:
 *         description: Data not found
 */
router.get('/:month', (req, res) => {
    const month = req.params.month.toLowerCase();
    const data = nameDays.nameDays[month];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

/**
 * @swagger
 * /{month}/{date}:
 *   get:
 *     summary: Get name days for a specific date
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Date data
 *       404:
 *         description: Data not found
 */
router.get('/:month/:date', (req, res) => {
    const { month, date } = req.params;

    const data = nameDays.nameDays?.[month.toLowerCase()]?.[date];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

/**
 * @swagger
 * /{month}/{date}/{country}:
 *   get:
 *     summary: Get name days for a specific country
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         example: greece
 *     responses:
 *       200:
 *         description: Country-specific data
 *       404:
 *         description: Data not found
 */
router.get('/:month/:date/:country', (req, res) => {
    const { month, date, country } = req.params;

    const data =
        nameDays.nameDays?.[month.toLowerCase()]?.[date]?.[country.toLowerCase()];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

module.exports = router;
