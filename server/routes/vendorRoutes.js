const express = require("express");
const vendorController = require("../controllers/vendorController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/requests", authorize(["vendor"]), vendorController.getRequests);
router.post("/plans", authorize(["vendor"]), vendorController.createPlan);
router.post("/send-credentials", authorize(["vendor"]), vendorController.sendCredentials);
router.post("/chat", authorize(["vendor"]), vendorController.startChat);

module.exports = router;
