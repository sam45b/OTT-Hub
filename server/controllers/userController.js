exports.getSubscriptions = (req, res) => {
    res.json({ message: 'Fetched subscriptions' });
  };
  
  exports.purchaseSubscription = (req, res) => {
    res.json({ message: 'Subscription purchased' });
  };
  
  exports.startChat = (req, res) => {
    res.json({ message: 'Chat started' });
  };
  