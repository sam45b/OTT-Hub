const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const vendorRoutes = require("./routes/vendorRoutes");
// const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);
// app.use("/vendor", vendorRoutes);
// app.use("/admin", adminRoutes);

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection error:", err));

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
