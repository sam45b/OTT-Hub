const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscriptionPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    requests: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
        credentialsSent: { type: Boolean, default: false },
        refundRequested: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }],
    activeSubscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    expiredSubscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = mongoose.model("Vendor", VendorSchema);
