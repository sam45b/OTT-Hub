const express = require('express');
const TransactionController = require('../controllers/transactionController');

const router = express.Router();

// POST route for creating a purchase
router.post('/purchase', TransactionController.createPurchase);

module.exports = router;
