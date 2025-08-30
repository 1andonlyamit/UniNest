const express = require('express');
const router = express.Router();
const skillsController = require('../../controller/student_c/studentSkills_c');

router.post('/', skillsController.create);
router.get('/student/:student_id', skillsController.getByStudent);
router.get('/:id', skillsController.getById);
router.put('/:id', skillsController.update);
router.delete('/:id', skillsController.delete);

module.exports = router;
