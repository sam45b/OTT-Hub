const Subscription = require('../models/Subscription');
const Purchase = require('../models/Purchase');

// Create a purchase
exports.createPurchase = async (req, res) => {
  const { subscriptionId, buyer, price, duration } = req.body;

  try {
    // Find the subscription
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Check if there are available slots
    if (subscription.slots <= 0) {
      return res.status(400).json({ message: 'No available slots' });
    }

    // Create the purchase
    const newPurchase = new Purchase({
      subscriptionId,
      buyer,
      price,
      duration,
    });

    await newPurchase.save();

    // Update the subscription slots
    subscription.slots -= 1;
    await subscription.save();

    res.status(201).json({ message: 'Purchase successful', data: newPurchase });
  } catch (err) {
    res.status(500).json({ message: 'Error processing purchase', error: err });
  }
};
