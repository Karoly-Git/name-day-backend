const nameDays = require("../data/namedays.data");

const dataset = nameDays.nameDays ?? nameDays;

function notFound(res) {
    return res.status(404).json({ error: "Data not found" });
}

exports.getAll = (req, res) => {
    res.json(dataset);
};

exports.getMonth = (req, res) => {
    const month = req.params.month?.toLowerCase();
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    if (!months.includes(month)) {
        return res.status(404).json({ error: "Wrong month given! Please give a correct month name." });
    }

    const data = dataset?.[month];
    if (!data) {
        return res.status(404).json({ error: "No data found for this month." });
    }

    res.json(data);
};

exports.getMonthDate = (req, res) => {
    const month = req.params.month?.toLowerCase();
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    if (!months.includes(month)) {
        return res.status(404).json({ error: "Wrong month given! Please give a correct month name." });
    }

    const date = Number(req.params.date);
    if (!Number.isInteger(date) || date < 1 || date > 31) {
        return res.status(404).json({ error: "Wrong date given! Please give a correct date between 1 and 31." });
    }

    const data = dataset?.[month]?.[date];
    if (!data) {
        return res.status(404).json({
            error: `No data found for the given date. The date may exceed the number of days in ${month}.`
        });
    }

    res.json(data);
};

exports.getMonthDateCountry = (req, res) => {
    const month = req.params.month?.toLowerCase();
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    if (!months.includes(month)) {
        return res.status(404).json({ error: "Wrong month given! Please give a correct month name." });
    }

    const date = Number(req.params.date);
    if (!Number.isInteger(date) || date < 1 || date > 31) {
        return res.status(404).json({ error: "Wrong date given! Please give a correct date between 1 and 31." });
    }

    const country = req.params.country?.toLowerCase();
    const allowedCountries = ["pl", "hu"];

    if (!allowedCountries.includes(country)) {
        return res.status(404).json({ error: "Wrong country given! Allowed values are: pl, hu." });
    }

    const data = dataset?.[month]?.[date]?.[country];
    if (!data) {
        return res.status(404).json({
            error: `No data found for ${country} on ${month} ${date}.`
        });
    }

    res.json(data);
};
