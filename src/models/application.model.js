const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  coverLetter: String,
  resume: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
