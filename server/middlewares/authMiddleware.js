const jwt = require("jsonwebtoken");
const config = require("../config");

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]||"";
    if (!token) return res.status(403).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
