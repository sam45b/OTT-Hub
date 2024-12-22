const Razorpay = require("razorpay");
const config = require("../config");

const razorpay = new Razorpay({
    key_id: config.PAYMENT_API_KEY,
    key_secret: config.PAYMENT_API_SECRET,
});

exports.createOrder = (amount, currency = "INR") => {
    return razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency,
        receipt: "receipt#1",
    });
};
