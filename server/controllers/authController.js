const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users"); // Assuming a User model exists
const config = require("../config"); // Contains JWT_SECRET

require("dotenv").config();

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Validate role
        const allowedRoles = ["user", "vendor", "admin"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};


exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email, role });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(token);
        
        return res.status(200).json({ token});
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};
