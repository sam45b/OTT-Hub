const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  oTTPlatform: {
    type: String,
    required: true,
  },
  subscriptionPlan: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
