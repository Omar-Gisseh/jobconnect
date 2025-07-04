exports.submitApplication = (req, res) => {
  const { fullname, email, cover } = req.body;
  const resume = req.file;

  if (!fullname || !email || !cover || !resume) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Save application to DB here if needed, or just log it
  console.log('New Application:', {
    fullname,
    email,
    cover,
    resume: resume.filename
  });

  res.status(200).json({ message: 'Application submitted successfully!' });
};




