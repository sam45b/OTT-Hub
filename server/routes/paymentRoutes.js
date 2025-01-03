const express = require("express");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const Vendor = require("../models/Vendor"); // Assuming Vendor model is in models/Vendor.js
const Subscription = require("../models/Subscription"); // Subscription model
const User = require("../models/Users"); // User model
const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_oSinNdhrLlnhXo",
  key_secret: "Vx5W8O3KggaIpomMo5s0izMp",
});

// Route to create an order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Route to verify payment and store record in Vendor schema
router.post("/verify-payment", async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, subscriptionId } = req.body;

  try {
    // Verify payment signature
    const crypto = require("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", "Vx5W8O3KggaIpomMo5s0izMp") // Your Razorpay key_secret
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    // Add record to Vendor schema
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const vendor = await Vendor.findOne({ userId });
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Add request to Vendor
    vendor.requests.push({
      userId,
      status: "pending",
      createdAt: new Date(),
    });

    // Add subscription to activeSubscriptions
    vendor.activeSubscriptions.push(subscriptionId);

    await vendor.save();

    res.status(200).json({ message: "Payment verified and vendor record updated" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

module.exports = router;
