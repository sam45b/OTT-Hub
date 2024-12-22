const Admin = require("../models/Admin");
const Vendor = require("../models/Vendor");

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error });
    }
};

exports.approveVendor = async (req, res) => {
    const { vendorId } = req.body;

    try {
        await Vendor.findByIdAndUpdate(vendorId, { approved: true });
        res.status(200).json({ message: "Vendor approved successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error approving vendor", error });
    }
};

exports.managePlan = async (req, res) => {
    // Logic for managing subscription plans
};

exports.startChat = async (req, res) => {
    // Chat initiation logic here
};
