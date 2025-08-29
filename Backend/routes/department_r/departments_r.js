const express = require("express");
const DepartmentsController = require("../controller/departments_c");

const router = express.Router();
const departmentsController = new DepartmentsController();

// CRUD routes
router.post("/", (req, res) => departmentsController.create(req, res));
router.get("/", (req, res) => departmentsController.getAll(req, res));
router.get("/:id", (req, res) => departmentsController.getById(req, res));
router.put("/:id", (req, res) => departmentsController.update(req, res));
router.delete("/:id", (req, res) => departmentsController.delete(req, res));

module.exports = router;
