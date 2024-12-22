const express = require("express");
const adminController = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/vendors", authorize(["admin"]), adminController.getVendors);
router.post("/approve-vendor", authorize(["admin"]), adminController.approveVendor);
router.post("/manage-plan", authorize(["admin"]), adminController.managePlan);
router.post("/chat", authorize(["admin"]), adminController.startChat);

module.exports = router;
