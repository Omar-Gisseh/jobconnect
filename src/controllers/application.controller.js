const Application = require('../models/application.model'); // Make sure you create this model

// POST /api/applications
exports.submitApplication = async (req, res) => {
  try {
    const { fullname, email, coverLetter } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ message: "Full name and email are required." });
    }

    let resumePath = null;

    // If a file was uploaded
    if (req.file) {
      resumePath = req.file.path; // this is the path saved by multer
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

    res.status(201).json({ message: "Application submitted successfully!", application });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ message: "Server error while submitting application." });
  }
};
