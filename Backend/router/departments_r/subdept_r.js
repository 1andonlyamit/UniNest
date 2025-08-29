// src/routes/subdept_r.js
const express = require('express');
const router = express.Router();
const SubDeptController = require('../../controller/departments_c/subdept_c.js');

const subDeptController = new SubDeptController();


router.post('/', (req, res) => subDeptController.create(req, res));
router.get('/', (req, res) => subDeptController.getAll(req, res));
router.get('/:id', (req, res) => subDeptController.getById(req, res));
router.put('/:id', (req, res) => subDeptController.update(req, res));
router.delete('/:id', (req, res) => subDeptController.delete(req, res));

module.exports = router;
