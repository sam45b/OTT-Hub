const express = require('express');
const SubscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

// Get all subscriptions
router.get('/', SubscriptionController.getAllSubscriptions);

// Other subscription routes...
router.post('/', SubscriptionController.createSubscription); // Example for creating a subscription

module.exports = router;
