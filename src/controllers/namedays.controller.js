const nameDays = require("../data/namedays.data");

const dataset = nameDays.nameDays ?? nameDays;

function notFound(res) {
    return res.status(404).json({ error: "Data not found" });
}

exports.getAll = (req, res) => {
    res.json(dataset);
};

exports.getMonth = (req, res) => {
    const month = req.params.month.toLowerCase();
    const data = dataset?.[month];
    if (!data) return notFound(res);
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
