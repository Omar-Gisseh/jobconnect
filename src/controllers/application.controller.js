const fs = require("fs");
const path = require("path");
const Application = require("../models/application.model");

// Make sure uploads folder exists
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(" Created uploads folder");
}

// POST /api/applications
exports.submitApplication = async (req, res) => {
  try {
    const { fullname, email, coverLetter } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    let resumePath = null;
    let resumeUrl = null;

    if (req.file) {
      resumePath = req.file.path; // Relative path
      resumeUrl = `${req.protocol}://${req.get("host")}/${resumePath.replace("\\", "/")}`; // Full URL
    }

    const application = new Application({
      fullname,
      email,
      coverLetter,
      resume: resumePath,
      submittedAt: new Date(),
    });

    await application.save();

    console.log(" New Application:", application);

    res.status(201).json({
      message: "Application submitted successfully!",
      application: {
        fullname,
        email,
        coverLetter,
        resumeUrl,
        submittedAt: application.submittedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while submitting application." });
  }
};
