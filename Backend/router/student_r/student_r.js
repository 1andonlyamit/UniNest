// routes/student_r.js
const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/student_c/student_c');

const studentController = new StudentController();

router.post('/', (req, res) => studentController.create(req, res));
router.get('/', (req, res) => studentController.getAll(req, res));
router.get('/:id', (req, res) => studentController.getById(req, res));
router.put('/:id', (req, res) => studentController.update(req, res));
router.delete('/:id', (req, res) => studentController.delete(req, res));

module.exports = router;
