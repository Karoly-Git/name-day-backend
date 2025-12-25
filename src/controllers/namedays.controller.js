const nameDays = require("../data/namedays.data");

const dataset = nameDays.nameDays ?? nameDays;

function notFound(res) {
    return res.status(404).json({ error: "Data not found" });
}

exports.getAll = (req, res) => {
    res.json(dataset);
};

exports.getMonth = (req, res) => {
    const monthParam = req.params.month;
    if (!monthParam) {
        return res.status(400).json({ error: "Month parameter is required." });
    }

    const month = monthParam.toLowerCase();
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
    const month = req.params.month.toLowerCase();
    const date = req.params.date;
    const data = dataset?.[month]?.[date];
    if (!data) return notFound(res);
    res.json(data);
};

exports.getMonthDateCountry = (req, res) => {
    const month = req.params.month.toLowerCase();
    const date = req.params.date;
    const country = req.params.country.toLowerCase();
    const data = dataset?.[month]?.[date]?.[country];
    if (!data) return notFound(res);
    res.json(data);
};
