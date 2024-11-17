const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY',
  key_secret: 'YOUR_RAZORPAY_SECRET', // You need your secret key for creating orders
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body; // Amount should be received from the frontend

  const options = {
    amount: amount * 100, // amount in paisa
    currency: 'INR',
    receipt: `receipt_${Math.floor(Math.random() * 100000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
