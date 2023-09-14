const express = require('express');

const router = express.Router();
// home page controller
const student_manager_controller = require('../controller/student_manager_controller');

router.get('/details', student_manager_controller.studentManager);

module.exports = router;