require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

const PORT = process.env.PORT || 8000;
const nameDays = require('./src/data');

// Middleware
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check (for Heroku & monitoring)
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns API health status
 *     responses:
 *       200:
 *         description: API is running
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Root – return all data
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all name days data
 *     responses:
 *       200:
 *         description: All name days
 */
app.get('/', (req, res) => {
    res.json(nameDays.nameDays);
});

// Month
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
app.get('/:month', (req, res) => {
    const month = req.params.month.toLowerCase();
    const data = nameDays.nameDays[month];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

// Month + Date
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
app.get('/:month/:date', (req, res) => {
    const month = req.params.month.toLowerCase();
    const date = req.params.date;
    const data = nameDays.nameDays?.[month]?.[date];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

// Month + Date + Country
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
 *         description: Country-specific name days
 *       404:
 *         description: Data not found
 */
app.get('/:month/:date/:country', (req, res) => {
    const month = req.params.month.toLowerCase();
    const date = req.params.date;
    const country = req.params.country.toLowerCase();

    const data = nameDays.nameDays?.[month]?.[date]?.[country];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
