const express = require("express");
const cors = require("cors");
require("dotenv").config();
const guestRoutes = require("./routes/guestRoutes");
const { connectDB } = require("./config/db");
const orderRoutes = require('./routes/orderRoutes');


// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/guests", guestRoutes);
app.use('/api', orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
