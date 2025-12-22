const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const nameDays = require('./src/data')

app.get('/', (req, res) => {
    res.json(nameDays.nameDays)
});

app.get('/:month?/:date?/:country?', (req, res) => {
    const { month, date, country } = req.params;
    const data = nameDays.nameDays;

    if (!month) {
        res.json(data);
        return;
    }

    if (!data[month]) {
        res.status(404).json({ error: 'Data not found' });
        return;
    }

    if (!date) {
        res.json(data[month]);
        return;
    }

    if (!data[month][date]) {
        res.status(404).json({ error: 'Data not found' });
        return;
    }

    if (!country) {
        res.json(data[month][date]);
        return;
    }

    if (!data[month][date][country]) {
        res.status(404).json({ error: 'Data not found' });
        return;
    }

    res.json(data[month][date][country]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

