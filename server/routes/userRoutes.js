const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

// router.use(authenticate);

router.get('/subscriptions', userController.getSubscriptions);
router.get('/subscriptions/:id', userController.purchaseSubscription);
router.post('/chat', authorize(['user']), userController.startChat);

module.exports = router;
