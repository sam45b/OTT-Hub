// In your backend (Node.js/Express)
exports.getSubscriptions =  async (req, res) => {
  try {
      const subscriptions = await Subscription.find(); // Fetch all subscriptions from the database
      res.status(200).json(subscriptions);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

  
  exports.purchaseSubscription = async (req, res) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscription details" });
    }
  }
  
  exports.startChat = (req, res) => {
    res.json({ message: 'Chat started' });
  };
  