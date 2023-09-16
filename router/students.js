const express = require('express');

const router = express.Router();
// home page controller
const student_manager_controller = require('../controller/student_manager_controller');

router.get('/details', student_manager_controller.studentManager);
router.post('/add', student_manager_controller.addStudent);

module.exports = router;