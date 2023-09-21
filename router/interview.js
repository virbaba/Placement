const express = require('express');

const router = express.Router();
// placement manager controller controller
const interview_manager_controller = require('../controller/interview_manager_controller');

router.get('/details', interview_manager_controller.details);
router.post('/create', interview_manager_controller.create);
router.get('/allocate_form/:id', interview_manager_controller.allocateForm);
router.post('/allocate', interview_manager_controller.allocate);
router.get('/delete/:id', interview_manager_controller.details);


module.exports = router;