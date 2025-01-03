const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Vendor" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  planName: { type: String, required: true },
  oTTPlatform: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
