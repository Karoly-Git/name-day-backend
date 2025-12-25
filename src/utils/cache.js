const NodeCache = require("node-cache");

// stdTTL default is 60s; you can override per-route
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

module.exports = cache;
