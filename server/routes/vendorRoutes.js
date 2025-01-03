const express = require("express");
const {createPlan,getRequests,getRequestDetails,updateRequestStatus} = require("../controllers/vendorControllers");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

// router.use(authenticate);

router.get("/manage/requests", getRequests);
router.get("/manage/request/:id", getRequestDetails);
router.post("/create-plan", createPlan);
router.patch("/manage/request/:id",updateRequestStatus)
// router.post("/send-credentials", authorize(["vendor"]), vendorController.sendCredentials);
// router.post("/chat", authorize(["vendor"]), vendorController.startChat);

module.exports = router;
