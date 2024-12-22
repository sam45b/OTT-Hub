const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = (payload) => jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

exports.verifyToken = (token) => jwt.verify(token, config.JWT_SECRET);
