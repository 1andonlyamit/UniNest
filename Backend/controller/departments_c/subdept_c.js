// controllers/departments_c/subdept_c.js
const SubDepartmentsModel = require("../../model/departments_m/subdept_m");
const subDepartmentsModel = new SubDepartmentsModel();

class SubDepartmentsController {
    // Create a new sub-department
    async create(req, res) {
        try {
            const { department_id, name } = req.body;

            if (!department_id || !name) {
                return res.status(400).json({ message: "department_id and name are required" });
            }

            const newSubDept = await subDepartmentsModel.createSubDepartment({ department_id, name });
            res.status(201).json({ message: "Sub-department created", subDepartment: newSubDept });
        } catch (err) {
            console.error("Create SubDepartment Error:", err);
            res.status(500).json({ error: "Failed to create sub-department" });
        }
    }

    // Get all sub-departments
    async getAll(req, res) {
        try {
            const subDepartments = await subDepartmentsModel.getAllSubDepartments();
            res.json(subDepartments);
        } catch (err) {
            console.error("Get All SubDepartments Error:", err);
            res.status(500).json({ error: "Failed to fetch sub-departments" });
        }
    }

    // Get sub-department by ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const subDepartment = await subDepartmentsModel.getSubDepartmentById(id);

            if (!subDepartment) {
                return res.status(404).json({ message: "Sub-department not found" });
            }

            res.json(subDepartment);
        } catch (err) {
            console.error("Get SubDepartment By ID Error:", err);
            res.status(500).json({ error: "Failed to fetch sub-department" });
        }
    }

    // Update sub-department
    async update(req, res) {
        try {
            const id = req.params.id;
            const { department_id, name } = req.body;

            if (!department_id || !name) {
                return res.status(400).json({ message: "department_id and name are required" });
            }

            const updatedSubDept = await subDepartmentsModel.updateSubDepartment(id, { department_id, name });

            if (!updatedSubDept) {
                return res.status(404).json({ message: "Sub-department not found" });
            }

            res.json({ message: "Sub-department updated", subDepartment: updatedSubDept });
        } catch (err) {
            console.error("Update SubDepartment Error:", err);
            res.status(500).json({ error: "Failed to update sub-department" });
        }
    }

    // Delete sub-department
    async delete(req, res) {
        try {
            const id = req.params.id;
            const deleted = await subDepartmentsModel.deleteSubDepartment(id);

            if (!deleted) {
                return res.status(404).json({ message: "Sub-department not found" });
            }

            res.json({ message: "Sub-department deleted" });
        } catch (err) {
            console.error("Delete SubDepartment Error:", err);
            res.status(500).json({ error: "Failed to delete sub-department" });
        }
    }
}

module.exports = SubDepartmentsController;
