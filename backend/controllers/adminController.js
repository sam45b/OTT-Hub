const Subscription = require('../models/Subscription');

exports.getPendingSubscriptions = async (req, res) => {
  try {
    const pendingSubscriptions = await Subscription.find({ status: 'pending' }).populate('seller', 'name');
    res.status(200).json(pendingSubscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending subscriptions', error });
  }
};

exports.approveSubscription = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'available';
    await subscription.save();

    res.status(200).json({ message: 'Subscription approved' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving subscription', error });
  }
};
