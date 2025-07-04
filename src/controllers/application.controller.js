const path = require("path");
const fs = require("fs");


const applications = [];

// POST /api/applications
exports.submitApplication = async (req, res) => {
  try {
    const { fullname, email, coverLetter } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    let resumePath = null;

    // If resume was uploaded
    if (req.file) {
      resumePath = req.file.path;
    }

    // Example: store application
    const application = {
      fullname,
      email,
      coverLetter,
      resume: resumePath,
      submittedAt: new Date(),
    };

    applications.push(application);

    console.log("New Application:", application);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while submitting application." });
  }
};
