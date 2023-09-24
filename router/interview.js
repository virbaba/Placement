const express = require('express');

const router = express.Router();
// placement manager controller controller
const interview_manager_controller = require('../controller/interview_manager_controller');

// show interview details
router.get('/details', interview_manager_controller.details);
// create interview
router.post('/create', interview_manager_controller.create);
// open interview allocate form
router.get('/allocate_form/:id', interview_manager_controller.allocateForm);
// interview allocation details
router.post('/allocate', interview_manager_controller.allocate);
// update interview status
router.post('/status_update', interview_manager_controller.updateStatus);
// delete interview
router.get('/delete/:id', interview_manager_controller.delete);


module.exports = router;