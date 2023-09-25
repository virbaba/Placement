const express = require('express');

const router = express.Router();

const job_controller = require('../controller/job_controller');

router.get('/jobs', job_controller.jobs);

module.exports = router;