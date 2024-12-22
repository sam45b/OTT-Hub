const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planName: { type: String, required: true },
    duration: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    loginCredentials: { type: String, default: "" },
    refundStatus: { type: String, enum: ["not_requested", "requested", "processed"], default: "not_requested" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
