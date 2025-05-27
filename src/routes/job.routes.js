const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

// Define routes and connect them to controller functions
router.get('/', jobController.getAllJobs);         // GET /api/jobs
router.get('/:id', jobController.getJobById);      // GET /api/jobs/:id
router.post('/', jobController.createJob);         // POST /api/jobs
router.put('/:id', jobController.updateJob);       // PUT /api/jobs/:id
router.delete('/:id', jobController.deleteJob);    // DELETE /api/jobs/:id

module.exports = router;
