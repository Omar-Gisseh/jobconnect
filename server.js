//  Import core modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//  Load environment variables from .env file
dotenv.config();

// Import DB connection function
const connectDB = require("./src/config/db");


connectDB(); 

//  Initialize Express app
const app = express();

//  Middleware
app.use(cors());             // Allows cross-origin requests
app.use(express.json());     // Parses incoming JSON requests

//  ROUTE IMPORTS
const jobRoutes = require("./src/routes/job.routes");    //  Handles /api/jobs
const authRoutes = require("./src/routes/auth.routes");  // Handles /api/auth

//  ROUTE MIDDLEWARE
app.use("/api/jobs", jobRoutes);    // Forward job-related requests
app.use("/api/auth", authRoutes);   // Forward auth-related requests

//  TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});



// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
