const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users"); // Assuming a User model exists
const config = require("../config"); // Contains JWT_SECRET


exports.signup = async (req, res) => {
    const { name,email,password,role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // Ensure it's one of the allowed roles: 'user', 'vendor', 'admin'
        });

        await newUser.save();

        return res.status(200).json({ token });
    } catch (error) {
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