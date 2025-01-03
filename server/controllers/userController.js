const Subscription = require('../models/Subscription'); 

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find(); 
    console.log(subscriptions); 
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};


  
  exports.purchaseSubscription = async (req, res) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      console.log(req.params.id)
      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscription details" });
    }
  }
  
  exports.startChat = (req, res) => {
    res.json({ message: 'Chat started' });
  };
  