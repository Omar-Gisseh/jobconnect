const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // configure as needed

router.post('/', upload.single('resume'), applicationController.submitApplication);

module.exports = router;
