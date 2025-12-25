const rateLimit = require("express-rate-limit");

exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 300, // 300 requests per IP per 15 min
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
});
