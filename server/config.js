module.exports = {
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/",
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret",
    EMAIL_USER: process.env.EMAIL_USER || "your_email@example.com",
    EMAIL_PASS: process.env.EMAIL_PASS || "your_email_password",
    PAYMENT_API_KEY: process.env.PAYMENT_API_KEY || "your_payment_api_key",
    PAYMENT_API_SECRET: process.env.PAYMENT_API_SECRET || "your_payment_api_secret",
};
