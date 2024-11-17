const Subscription = require("../models/Subscription");

// Create a new subscription
exports.createSubscription = async (req, res) => {
  const { oTTPlatform, subscriptionPlan, price, duration, description } = req.body;

  

  try {
    const newSubscription = new Subscription({
      oTTPlatform,
      subscriptionPlan,
      price,
      duration,
      description,
    });

    const savedSubscription = await newSubscription.save();
    res.status(201).json({ message: "Subscription created successfully", data: savedSubscription });
  } catch (err) {
    res.status(500).json({ message: "Error creating subscription", error: err });
  }
};


// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: err });
  }
};
