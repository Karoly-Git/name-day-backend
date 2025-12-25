const cache = require("../utils/cache");

exports.cacheMiddleware = (ttlSeconds = 60) => {
    return (req, res, next) => {
        const key = `__express__${req.originalUrl}`;

        const cached = cache.get(key);
        if (cached) return res.json(cached);

        // Monkey-patch res.json to store response
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            cache.set(key, body, ttlSeconds);
            return originalJson(body);
        };

        next();
    };
};
