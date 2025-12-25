const nameDays = require("../data/namedays.data");

const dataset = nameDays.nameDays ?? nameDays;

/* =========================
   Constants
========================= */

const MONTHS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
];

const ALLOWED_COUNTRIES = ["pl", "hu"];

/* =========================
   Helpers
========================= */

function getValidMonth(req, res) {
    const month = req.params.month?.toLowerCase();
    if (!MONTHS.includes(month)) {
        res.status(404).json({
            error: "Wrong month given! Please give a correct month name.",
            possible_values: MONTHS
        });
        return null;
    }
    return month;
}

function getValidDate(req, res) {
    const date = Number(req.params.date);
    if (!Number.isInteger(date) || date < 1 || date > 31) {
        res.status(404).json({
            error: "Wrong date given! Please give a correct date between 1 and 31."
        });
        return null;
    }
    return date;
}

function getValidCountry(req, res) {
    const country = req.params.country?.toLowerCase();
    if (!ALLOWED_COUNTRIES.includes(country)) {
        res.status(404).json({
            error: "Wrong country given! Allowed values are: pl (Poland), hu (Hungary)."
        });
        return null;
    }
    return country;
}

/* =========================
   Controllers
========================= */

exports.getAll = (req, res) => {
    res.json(dataset);
};

exports.getMonth = (req, res) => {
    const month = getValidMonth(req, res);
    if (!month) return;

    const data = dataset?.[month];
    if (!data) {
        return res.status(404).json({ error: "No data found for this month." });
    }

    res.json(data);
};

exports.getMonthDate = (req, res) => {
    const month = getValidMonth(req, res);
    if (!month) return;

    const date = getValidDate(req, res);
    if (!date) return;

    const data = dataset?.[month]?.[date];
    if (!data) {
        return res.status(404).json({
            error: `No data found for the given date. The date may exceed the number of days in ${month}.`
        });
    }

    res.json(data);
};

exports.getMonthDateCountry = (req, res) => {
    const month = getValidMonth(req, res);
    if (!month) return;

    const date = getValidDate(req, res);
    if (!date) return;

    const country = getValidCountry(req, res);
    if (!country) return;

    const data = dataset?.[month]?.[date]?.[country];
    if (!data) {
        return res.status(404).json({
            error: `No data found for ${country} on ${month} ${date}.`
        });
    }

    res.json(data);
};
