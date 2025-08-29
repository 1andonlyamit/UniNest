// src/routes/departments_r/class_r.js
const express = require('express');
const router = express.Router();
const ClassesController = require('../../controller/departments_c/class_c');

const classesController = new ClassesController();

// Class CRUD routes
router.post('/', classesController.create.bind(classesController));
router.get('/', classesController.getAll.bind(classesController));
router.get('/:id', classesController.getById.bind(classesController));
router.put('/:id', classesController.update.bind(classesController));
router.delete('/:id', classesController.delete.bind(classesController));

module.exports = router;
