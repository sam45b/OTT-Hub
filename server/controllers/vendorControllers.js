const Vendor = require("../models/Vendor");
const Subscription = require("../models/Subscription"); // Import your Mongoose model
const mongoose = require("mongoose"); // Import mongoose

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    // Find the vendor request by ID
    const vendor = await Vendor.findOne({ "requests._id": id });

    if (!vendor) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the status of the request
    const request = vendor.requests.id(id); // Get the specific request
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status; // Update the status field
    await vendor.save(); // Save the changes to the database

    res.status(200).json({ message: `Request status updated to '${status}' successfully.` });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



exports.getRequests = async (req, res) => {
  try {
    const loggedInVendorId = req.vendorId; 
    // Find the vendor by their ID
    const vendor = await Vendor.findById(loggedInVendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Return all requests for the vendor
    res.status(200).json({ requests: vendor.requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getRequestDetails = async (req, res) => {
  try {
    const loggedInVendorId = req.vendorId; 
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const vendor = await Vendor.findById(loggedInVendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const request = vendor.requests.id(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error("Error fetching request details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { vendorId, userId, planName, oTTPlatform, duration, price, startDate, endDate } = req.body;

    const vendorObjectId = new mongoose.Types.ObjectId("675868fdef8916542c10ab91"); // Create ObjectId for vendorId
    const userObjectId = new mongoose.Types.ObjectId("67586ee6ef8916542c10ab96");     // Create ObjectId for userId

    const newPlan = new Subscription({
      vendorId: vendorObjectId,
      userId: userObjectId,
      planName,
      oTTPlatform,
      duration,
      price,
      startDate,
      endDate,
    });

    const savedPlan = await newPlan.save();
    res.status(201).json({ message: "Plan created successfully", plan: savedPlan });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(400).json({ error: error.message });
  }
};



exports.sendCredentials = async (req, res) => {
    // Logic for sending login credentials
};

exports.startChat = async (req, res) => {
    // Chat initiation logic here
};
