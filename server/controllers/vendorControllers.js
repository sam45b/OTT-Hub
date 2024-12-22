const Vendor = require("../models/Vendor");

exports.getRequests = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ userId: req.user.id }).populate("requests.userId");
        res.status(200).json(vendor.requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error });
    }
};

exports.createPlan = async (req, res) => {
    // Logic for creating subscription plans
};

exports.sendCredentials = async (req, res) => {
    // Logic for sending login credentials
};

exports.startChat = async (req, res) => {
    // Chat initiation logic here
};
