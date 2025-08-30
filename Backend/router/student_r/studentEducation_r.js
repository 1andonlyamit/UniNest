const express = require('express');
const router = express.Router();
const educationController = require('../../controller/student_c/studentEducation_c');

router.post('/', educationController.create);                    // Create
router.get('/student/:student_id', educationController.getByStudent); // Get all by student
router.get('/:id', educationController.getById);                // Get by id
router.put('/:id', educationController.update);                 // Update
router.delete('/:id', educationController.delete);              // Delete

module.exports = router;
