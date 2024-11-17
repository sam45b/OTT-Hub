const express = require('express');
const { getPendingSubscriptions, approveSubscription } = require('../controllers/adminController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.get('/pending', authMiddleware, getPendingSubscriptions);
router.post('/approve/:subscriptionId', authMiddleware, approveSubscription);

module.exports = router;
