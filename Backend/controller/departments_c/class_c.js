// controllers/departments_c/class_c.js
const ClassesModel = require("../../model/departments_m/class_m");
const classesModel = new ClassesModel();

class ClassesController {
    // Create a new class
    async create(req, res) {
        try {
            const { sub_department_id, name, batch_year, section } = req.body;

            if (!sub_department_id || !name || !batch_year) {
                return res.status(400).json({ message: "sub_department_id, name, and batch_year are required" });
            }

            const newClass = await classesModel.createClass({ sub_department_id, name, batch_year, section });
            res.status(201).json({ message: "Class created", class: newClass });
        } catch (err) {
            console.error("Create Class Error:", err);
            res.status(500).json({ error: "Failed to create class" });
        }
    }

    // Get all classes
    async getAll(req, res) {
        try {
            const classes = await classesModel.getAllClasses();
            res.json(classes);
        } catch (err) {
            console.error("Get All Classes Error:", err);
            res.status(500).json({ error: "Failed to fetch classes" });
        }
    }

    // Get class by ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const classData = await classesModel.getClassById(id);

            if (!classData) {
                return res.status(404).json({ message: "Class not found" });
            }

            res.json(classData);
        } catch (err) {
            console.error("Get Class By ID Error:", err);
            res.status(500).json({ error: "Failed to fetch class" });
        }
    }

    // Update class
    async update(req, res) {
        try {
            const id = req.params.id;
            const { sub_department_id, name, batch_year, section } = req.body;

            if (!sub_department_id || !name || !batch_year) {
                return res.status(400).json({ message: "sub_department_id, name, and batch_year are required" });
            }

            const updatedClass = await classesModel.updateClass(id, { sub_department_id, name, batch_year, section });

            if (!updatedClass) {
                return res.status(404).json({ message: "Class not found" });
            }

            res.json({ message: "Class updated", class: updatedClass });
        } catch (err) {
            console.error("Update Class Error:", err);
            res.status(500).json({ error: "Failed to update class" });
        }
    }

    // Delete class
    async delete(req, res) {
        try {
            const id = req.params.id;
            const deleted = await classesModel.deleteClass(id);

            if (!deleted) {
                return res.status(404).json({ message: "Class not found" });
            }

            res.json({ message: "Class deleted" });
        } catch (err) {
            console.error("Delete Class Error:", err);
            res.status(500).json({ error: "Failed to delete class" });
        }
    }
}

module.exports = ClassesController;
