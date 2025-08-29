const express = require("express");
const DepartmentsController = require("../../controller/departments_c/departments_c");
const AuthMiddleware = require("../../middleware/auth");

const router = express.Router();
const departmentsController = new DepartmentsController();
const authMiddleware = new AuthMiddleware();

// CRUD routes - all require university authentication
router.post("/", authMiddleware.authenticateUniversity.bind(authMiddleware), (req, res) => departmentsController.create(req, res));
router.get("/", authMiddleware.authenticateUniversity.bind(authMiddleware), (req, res) => departmentsController.getAll(req, res));
router.get("/:id", authMiddleware.authenticateUniversity.bind(authMiddleware), (req, res) => departmentsController.getOne(req, res));
router.put("/:id", authMiddleware.authenticateUniversity.bind(authMiddleware), (req, res) => departmentsController.update(req, res));
router.delete("/:id", authMiddleware.authenticateUniversity.bind(authMiddleware), (req, res) => departmentsController.delete(req, res));

module.exports = router;
