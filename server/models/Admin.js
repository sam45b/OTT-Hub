const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    managedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
    subscriptionPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    liveChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = mongoose.model("Admin", AdminSchema);
