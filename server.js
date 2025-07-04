// Import core modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Import DB connection function
const connectDB = require("./src/config/db");

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());                   // allow cross-origin requests
app.use(express.json());          // parse incoming JSON
app.use(express.static("public")); // serve static files (frontend)

// ROUTE IMPORTS
const jobRoutes = require("./src/routes/job.routes");
const authRoutes = require("./src/routes/auth.routes");
const applicationRoutes = require("./src/routes/application.routes");

// ROUTE MIDDLEWARE
app.use("/api/jobs", jobRoutes);               // handle /api/jobs
app.use("/api/auth", authRoutes);             // handle /api/auth
app.use("/api/applications", applicationRoutes); // handle /api/applications

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
