// Dummy data for now — replace with DB logic later
exports.getAllJobs = (req, res) => {
  res.json({ message: "Get all jobs" });
};

exports.getJobById = (req, res) => {
  res.json({ message: `Get job by ID: ${req.params.id}` });
};

exports.createJob = (req, res) => {
  res.json({ message: "Create a new job", data: req.body });
};

exports.updateJob = (req, res) => {
  res.json({ message: `Update job with ID: ${req.params.id}`, data: req.body });
};

exports.deleteJob = (req, res) => {
  res.json({ message: `Delete job with ID: ${req.params.id}` });
};
