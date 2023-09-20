const express = require('express');

const router = express.Router();
// placement manager controller controller
const interview_manager_controller = require('../controller/interview_manager_controller');

router.get('/details', interview_manager_controller.details);
router.post('/create', interview_manager_controller.create);

module.exports = router;