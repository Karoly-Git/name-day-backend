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
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Root – return all data
app.get('/', (req, res) => {
    res.json(nameDays.nameDays);
});

// Month
app.get('/:month', (req, res) => {
    const month = req.params.month.toLowerCase();
    const data = nameDays.nameDays[month];

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

// Month + Date
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
